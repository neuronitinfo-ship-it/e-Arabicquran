import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const itemTypeSchema = z.enum(["letter", "word", "ayah"]);

// SM-2 inspired spaced repetition
function nextSchedule(
  prev: { repetitions: number; ease: number; interval_days: number },
  quality: number, // 0-5
) {
  let { repetitions, ease, interval_days } = prev;
  if (quality < 3) {
    repetitions = 0;
    interval_days = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval_days = 1;
    else if (repetitions === 2) interval_days = 3;
    else interval_days = Math.round(interval_days * ease);
    ease = Math.max(1.3, ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  }
  const due = new Date(Date.now() + interval_days * 24 * 60 * 60 * 1000);
  return { repetitions, ease, interval_days, due_at: due.toISOString() };
}

export const recordAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        item_type: itemTypeSchema,
        item_key: z.string().min(1).max(120),
        correct: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase
      .from("learning_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("item_type", data.item_type)
      .eq("item_key", data.item_key)
      .maybeSingle();

    const prev = existing ?? {
      repetitions: 0,
      ease: 2.5,
      interval_days: 0,
      correct_count: 0,
      mistake_count: 0,
    };
    const sched = nextSchedule(prev, data.correct ? 5 : 1);
    const correct_count = prev.correct_count + (data.correct ? 1 : 0);
    const mistake_count = prev.mistake_count + (data.correct ? 0 : 1);
    const status: "new" | "learning" | "mastered" =
      sched.repetitions >= 4 && correct_count >= 4
        ? "mastered"
        : correct_count > 0 || mistake_count > 0
          ? "learning"
          : "new";

    const payload = {
      user_id: userId,
      item_type: data.item_type,
      item_key: data.item_key,
      status,
      correct_count,
      mistake_count,
      ...sched,
      last_seen_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("learning_progress")
      .upsert(payload, { onConflict: "user_id,item_type,item_key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("learning_progress")
      .select("item_type,item_key,status,correct_count,mistake_count,due_at")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);

    const summary = {
      letter: { total: 0, mastered: 0, learning: 0 },
      word: { total: 0, mastered: 0, learning: 0 },
      ayah: { total: 0, mastered: 0, learning: 0 },
    } as Record<string, { total: number; mastered: number; learning: number }>;

    for (const r of data ?? []) {
      summary[r.item_type].total += 1;
      if (r.status === "mastered") summary[r.item_type].mastered += 1;
      else if (r.status === "learning") summary[r.item_type].learning += 1;
    }
    return { items: data ?? [], summary };
  });

export const saveQuizResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        quiz_type: z.string().min(1).max(40),
        score: z.number().int().min(0),
        total: z.number().int().min(1),
        mistakes: z.array(z.string()).max(200),
        duration_seconds: z.number().int().min(0).max(36000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("quiz_results").insert({
      user_id: userId,
      quiz_type: data.quiz_type,
      score: data.score,
      total: data.total,
      mistakes: data.mistakes,
      duration_seconds: data.duration_seconds,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getRecentQuizzes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("quiz_results")
      .select("quiz_type,score,total,duration_seconds,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) throw new Error(error.message);
    return { items: data ?? [] };
  });
