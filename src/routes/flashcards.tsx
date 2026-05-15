import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { letters } from "@/data/arabic";
import { quranWords } from "@/data/arabic";
import { speakArabic } from "@/lib/speak";
import { useAuth } from "@/hooks/use-auth";
import { trackAnswer } from "@/lib/track";
import { Volume2, Check, X, RotateCcw, Shuffle } from "lucide-react";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "ফ্ল্যাশকার্ড — e-Arabicquran" },
      { name: "description", content: "হরফ ও কুরআনিক শব্দ মুখস্থ করার ফ্ল্যাশকার্ড — সঠিক/ভুল চাপলে স্পেসড রিপিটিশন কাজ করে।" },
    ],
  }),
  component: FlashcardsPage,
});

type Card = { key: string; ar: string; back: string; sub?: string };

function buildCards(mode: "letters" | "words"): Card[] {
  if (mode === "letters") {
    return letters.map((l) => ({
      key: l.translit,
      ar: l.isolated,
      back: l.bnName,
      sub: l.sound,
    }));
  }
  return quranWords.map((w) => ({
    key: w.translit,
    ar: w.ar,
    back: w.bn,
    sub: `${w.translit} · ${w.count}× কুরআনে`,
  }));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FlashcardsPage() {
  const [mode, setMode] = useState<"letters" | "words">("letters");
  const [seed, setSeed] = useState(0);
  const cards = useMemo(() => shuffle(buildCards(mode)), [mode, seed]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [queue, setQueue] = useState<Card[]>([]);
  const { user } = useAuth();

  const deck = queue.length > 0 ? queue : cards;
  const card = deck[idx];
  const done = idx >= deck.length;

  function next() {
    setFlipped(false);
    setIdx((i) => i + 1);
  }

  function answer(correct: boolean) {
    if (!card) return;
    trackAnswer(!!user, mode === "letters" ? "letter" : "word", card.key, correct);
    setStats((s) => ({ correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
    if (!correct) setQueue((q) => [...q, card]);
    next();
  }

  function restart() {
    setIdx(0);
    setFlipped(false);
    setStats({ correct: 0, wrong: 0 });
    setQueue([]);
    setSeed((s) => s + 1);
  }

  // Keyboard: Space = flip · 1/Y = জানি · 2/N = জানি না · A = audio
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done || !card) return;
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
      else if (e.key === "1" || e.key.toLowerCase() === "y") { e.preventDefault(); answer(true); }
      else if (e.key === "2" || e.key.toLowerCase() === "n") { e.preventDefault(); answer(false); }
      else if (e.key.toLowerCase() === "a") { e.preventDefault(); speakArabic(card.ar); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, done]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pt-10 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">অনুশীলন</p>
        <h1 className="mt-2 text-5xl">ফ্ল্যাশকার্ড</h1>
        <p className="font-bangla mt-2 text-sm text-muted-foreground">
          কার্ড উল্টে অর্থ দেখুন; ভুলগুলো শেষে আবার দেখানো হবে।
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
          <div className="font-bangla flex items-center gap-3 text-xs text-muted-foreground">
            <span className="text-emerald-700">✓ {stats.correct}</span>
            <span className="text-rose-700">✗ {stats.wrong}</span>
            <span>· {Math.min(idx + (done ? 0 : 1), deck.length)} / {deck.length}</span>
            <button onClick={restart} className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 hover:bg-accent">
              <Shuffle className="h-3 w-3" /> নতুন করে
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        {done ? (
          <div className="paper-card rounded-3xl p-10 text-center">
            <h2 className="text-3xl">শেষ! 🎉</h2>
            <p className="font-bangla mt-2 text-muted-foreground">
              {stats.correct} সঠিক · {stats.wrong} ভুল
            </p>
            <button
              onClick={restart}
              className="font-bangla mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground"
            >
              <RotateCcw className="h-4 w-4" /> আবার শুরু করুন
            </button>
          </div>
        ) : card ? (
          <>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="paper-card relative mx-auto block aspect-[4/3] w-full max-w-xl rounded-3xl p-8 text-center transition hover:shadow-lg"
            >
              <button
                onClick={(e) => { e.stopPropagation(); speakArabic(card.ar); }}
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="play"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              {!flipped ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="font-arabic text-7xl md:text-8xl">{card.ar}</div>
                  <div className="font-bangla mt-6 text-xs text-muted-foreground">কার্ডে চাপ দিয়ে অর্থ দেখুন</div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="font-arabic text-4xl text-primary">{card.ar}</div>
                  <div className="font-bangla mt-4 text-3xl">{card.back}</div>
                  {card.sub && <div className="font-bangla mt-2 text-sm text-muted-foreground">{card.sub}</div>}
                </div>
              )}
            </button>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => answer(false)}
                className="font-bangla inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-6 py-2.5 text-sm text-rose-800 hover:bg-rose-100"
              >
                <X className="h-4 w-4" /> জানি না
              </button>
              <button
                onClick={() => answer(true)}
                className="font-bangla inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-2.5 text-sm text-emerald-800 hover:bg-emerald-100"
              >
                <Check className="h-4 w-4" /> জানি
              </button>
            </div>
            <p className="font-bangla mt-6 text-center text-xs text-muted-foreground">
              {user ? "অগ্রগতি ক্লাউডে সেভ হচ্ছে।" : "অতিথি মোড — অগ্রগতি এই ডিভাইসে সেভ হচ্ছে।"}
            </p>
          </>
        ) : null}
      </section>
      <SiteFooter />
    </div>
  );
}
