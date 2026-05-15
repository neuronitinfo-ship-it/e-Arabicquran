import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { letters, quranWords } from "@/data/arabic";
import { speakArabic } from "@/lib/speak";
import { useAuth } from "@/hooks/use-auth";
import { trackAnswer, trackQuiz } from "@/lib/track";
import { Volume2, Check, X, Trophy, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "কুইজ — e-Arabicquran" },
      { name: "description", content: "আরবি হরফ ও শব্দের মাল্টিপল চয়েস কুইজ — স্কোর রাখুন, ভুলগুলো বারবার দেখুন।" },
    ],
  }),
  component: QuizPage,
});

type Q = { key: string; prompt: string; correct: string; choices: string[] };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz(mode: "letters" | "words", count = 12): Q[] {
  const pool = mode === "letters"
    ? letters.map((l) => ({ key: l.translit, ar: l.isolated, bn: l.bnName }))
    : quranWords.map((w) => ({ key: w.translit, ar: w.ar, bn: w.bn }));
  const picks = shuffle(pool).slice(0, Math.min(count, pool.length));
  return picks.map((p) => {
    const wrongs = shuffle(pool.filter((x) => x.key !== p.key)).slice(0, 3).map((x) => x.bn);
    return {
      key: p.key,
      prompt: p.ar,
      correct: p.bn,
      choices: shuffle([p.bn, ...wrongs]),
    };
  });
}

function QuizPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState<"letters" | "words">("letters");
  const [seed, setSeed] = useState(0);
  const quiz = useMemo(() => buildQuiz(mode), [mode, seed]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [startedAt] = useState(Date.now());
  const [retryQueue, setRetryQueue] = useState<Q[]>([]);

  const deck = retryQueue.length && idx >= quiz.length ? retryQueue : quiz;
  const total = quiz.length;
  const finished = idx >= deck.length && retryQueue.length === 0;
  const q = deck[idx];

  useEffect(() => {
    if (finished) {
      const dur = Math.round((Date.now() - startedAt) / 1000);
      trackQuiz(!!user, {
        quiz_type: mode === "letters" ? "letters_mcq" : "words_mcq",
        score,
        total,
        mistakes,
        duration_seconds: dur,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function pick(choice: string) {
    if (picked) return;
    setPicked(choice);
    const correct = choice === q.correct;
    if (correct) setScore((s) => s + 1);
    else {
      setMistakes((m) => [...m, q.key]);
      setRetryQueue((r) => [...r, q]);
    }
    trackAnswer(!!user, mode === "letters" ? "letter" : "word", q.key, correct);
  }

  function nextQ() {
    setPicked(null);
    if (idx + 1 >= deck.length && retryQueue.length > 0 && deck === quiz) {
      // move to retry queue
      setIdx(quiz.length); // signal switch
      setRetryQueue((r) => r);
    } else {
      setIdx((i) => i + 1);
    }
  }

  function restart() {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setMistakes([]);
    setRetryQueue([]);
    setSeed((s) => s + 1);
  }

  // Keyboard: 1-4 picks, Enter = next, A = audio
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (finished || !q) return;
      if (e.key >= "1" && e.key <= "4") {
        const i = Number(e.key) - 1;
        if (q.choices[i] && !picked) { e.preventDefault(); pick(q.choices[i]); }
      } else if (e.key === "Enter" && picked) {
        e.preventDefault(); nextQ();
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault(); speakArabic(q.prompt);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, picked, finished]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 pt-10 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">অনুশীলন</p>
        <h1 className="mt-2 text-5xl">কুইজ</h1>
        <p className="font-bangla mt-2 text-sm text-muted-foreground">
          আরবি দেখে সঠিক বাংলা অর্থ বেছে নিন। ভুলগুলো শেষে আবার আসবে।
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="font-bangla inline-flex rounded-full border border-border bg-card p-1 text-sm">
            {(["letters", "words"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); restart(); }}
                className={`rounded-full px-4 py-1.5 ${mode === m ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
              >
                {m === "letters" ? "হরফ" : "শব্দ"}
              </button>
            ))}
          </div>
          <div className="font-bangla text-xs text-muted-foreground">
            স্কোর: <span className="font-semibold text-foreground">{score}</span> / {total}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-20">
        {finished ? (
          <div className="paper-card rounded-3xl p-10 text-center">
            <Trophy className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl">কুইজ শেষ!</h2>
            <p className="font-bangla mt-2 text-muted-foreground">
              {score} / {total} · {Math.round((score / total) * 100)}%
            </p>
            {mistakes.length > 0 && (
              <p className="font-bangla mt-1 text-xs text-muted-foreground">{mistakes.length} টি ভুল আবার অনুশীলন করেছেন।</p>
            )}
            <button onClick={restart} className="font-bangla mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground">
              <RotateCcw className="h-4 w-4" /> আবার চেষ্টা করুন
            </button>
          </div>
        ) : q ? (
          <div className="paper-card rounded-3xl p-8">
            <div className="text-center">
              <button
                onClick={() => speakArabic(q.prompt)}
                className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="play"
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <div className="font-arabic mt-4 text-7xl text-foreground md:text-8xl">{q.prompt}</div>
            </div>
            <div className="mt-8 grid gap-2">
              {q.choices.map((c) => {
                const isCorrect = picked && c === q.correct;
                const isWrongPick = picked === c && c !== q.correct;
                return (
                  <button
                    key={c}
                    onClick={() => pick(c)}
                    disabled={!!picked}
                    className={`font-bangla flex items-center justify-between rounded-2xl border px-5 py-3 text-left text-sm transition ${
                      isCorrect
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : isWrongPick
                          ? "border-rose-300 bg-rose-50 text-rose-900"
                          : picked
                            ? "border-border bg-card text-foreground/60"
                            : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <span>{c}</span>
                    {isCorrect && <Check className="h-4 w-4" />}
                    {isWrongPick && <X className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            {picked && (
              <button
                onClick={nextQ}
                className="font-bangla mt-6 w-full rounded-full bg-primary py-2.5 text-sm text-primary-foreground hover:opacity-90"
              >
                পরবর্তী →
              </button>
            )}
          </div>
        ) : null}
      </section>
      <SiteFooter />
    </div>
  );
}
