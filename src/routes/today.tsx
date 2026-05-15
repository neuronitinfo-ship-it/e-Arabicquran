import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { getTodayPlan, getCompletionDate, markTodayComplete } from "@/lib/today";
import { speakArabic, playAyah } from "@/lib/speak";
import { useAuth } from "@/hooks/use-auth";
import { trackAnswer } from "@/lib/track";
import { Volume2, Check, ChevronRight, Sparkles, RotateCcw, Trophy } from "lucide-react";

export const Route = createFileRoute("/today")({
  head: () => ({
    meta: [
      { title: "আজকের পাঠ — e-Arabicquran" },
      { name: "description", content: "ধাপে-ধাপে আজকের ছোট্ট লক্ষ্য — ৫টি হরফ, ৫টি শব্দ, ১টি আয়াত।" },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const plan = useMemo(() => getTodayPlan(), []);
  const { user } = useAuth();
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    if (getCompletionDate() === plan.date) setAlreadyDone(true);
  }, [plan.date]);

  const step = plan.steps[i];
  const total = plan.steps.length;

  function next(correct: boolean) {
    trackAnswer(!!user, step.kind, step.key, correct);
    if (i + 1 >= total) {
      markTodayComplete();
      setDone(true);
    } else {
      setI(i + 1);
    }
  }

  // keyboard: Enter = জানি, Space = play audio
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done || alreadyDone) return;
      if (e.key === "Enter") { e.preventDefault(); next(true); }
      if (e.key === " ") {
        e.preventDefault();
        if (step.kind === "ayah") playAyah(step.surah, step.ayah);
        else speakArabic(step.ar);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, done, alreadyDone]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 pt-10 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">আজকের পাঠ</p>
        <h1 className="mt-2 text-5xl">ধাপে-ধাপে অনুশীলন</h1>
        <p className="font-bangla mt-2 text-sm text-muted-foreground">
          প্রতিদিন মাত্র ৫টি হরফ, ৫টি শব্দ ও ১টি আয়াত। নিয়মিততাই মূল।
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-20">
        {alreadyDone || done ? (
          <div className="paper-card rounded-3xl p-10 text-center">
            <Trophy className="mx-auto h-10 w-10 text-primary" aria-hidden />
            <h2 className="mt-4 text-3xl">দারুণ! আজকের কাজ শেষ 🎉</h2>
            <p className="font-bangla mt-2 text-sm text-muted-foreground">
              কাল আবার দেখা হবে — অভ্যাসই শক্তি।
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link to="/flashcards" className="font-bangla rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">আরও অনুশীলন</Link>
              <Link to="/progress" className="font-bangla rounded-full border border-border bg-card px-5 py-2 text-sm">অগ্রগতি দেখুন</Link>
              {alreadyDone && (
                <button
                  onClick={() => { setAlreadyDone(false); setDone(false); setI(0); }}
                  className="font-bangla inline-flex items-center gap-1 rounded-full border border-border bg-card px-5 py-2 text-sm"
                >
                  <RotateCcw className="h-4 w-4" /> আবার পড়ি
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bangla text-muted-foreground">{i + 1} / {total}</span>
                <span className="font-bangla text-muted-foreground capitalize">
                  {step.kind === "letter" ? "হরফ" : step.kind === "word" ? "শব্দ" : "আয়াত"}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((i) / total) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={i}
                  aria-valuemin={0}
                  aria-valuemax={total}
                />
              </div>
            </div>

            {/* Step card */}
            <div className="paper-card rounded-3xl p-8 text-center">
              <button
                onClick={() => step.kind === "ayah" ? playAyah(step.surah, step.ayah) : speakArabic(step.ar)}
                aria-label="উচ্চারণ শুনুন (Space)"
                className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <div className="font-arabic mt-5 text-5xl leading-[1.6] md:text-6xl">{step.ar}</div>
              <div className="font-bangla mt-4 text-2xl">{step.bn}</div>
              <div className="font-bangla mt-1 text-xs text-muted-foreground">{step.sub}</div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => next(false)}
                className="font-bangla inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring"
              >
                আবার দেখাও
              </button>
              <button
                onClick={() => next(true)}
                autoFocus
                className="font-bangla inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Check className="h-4 w-4" /> জানি · পরবর্তী <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="font-bangla mt-4 text-center text-[11px] text-muted-foreground">
              <Sparkles className="inline h-3 w-3" /> Enter = পরবর্তী · Space = উচ্চারণ
            </p>
          </>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
