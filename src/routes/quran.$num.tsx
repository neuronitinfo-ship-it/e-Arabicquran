import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { findSurah, ayahAudioUrl, type Ayah } from "@/data/surahs";
import { playAudio } from "@/lib/speak";
import { useAuth } from "@/hooks/use-auth";
import { trackAnswer } from "@/lib/track";
import { Volume2, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/quran/$num")({
  loader: ({ params }) => {
    const surah = findSurah(Number(params.num));
    if (!surah) throw notFound();
    return { surah };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.surah
      ? [
          { title: `সূরা ${loaderData.surah.bnName} — অনুশীলন` },
          { name: "description", content: `সূরা ${loaderData.surah.bnName} (${loaderData.surah.meaning}) — আয়াত-ভিত্তিক তিলাওয়াত ও বাংলা অনুবাদ।` },
        ]
      : [],
  }),
  component: SurahPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">
      <p className="font-bangla">এই সূরাটি এখনো যোগ করা হয়নি।</p>
    </div>
  ),
});

function SurahPage() {
  const { surah } = Route.useLoaderData();
  const { user } = useAuth();
  const [doneSet, setDoneSet] = useState<Set<number>>(new Set());

  function markDone(i: number) {
    setDoneSet((s) => {
      const next = new Set(s);
      next.add(i);
      return next;
    });
    trackAnswer(!!user, "ayah", `${surah.number}:${i + 1}`, true);
  }

  function play(i: number) {
    playAudio(ayahAudioUrl(surah.number, i + 1));
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pt-10 pb-4">
        <Link to="/quran" className="font-bangla inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> সব সূরা
        </Link>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div>
            <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">সূরা {surah.number}</p>
            <h1 className="mt-1 text-5xl">{surah.bnName}</h1>
            <p className="font-bangla mt-1 text-sm text-muted-foreground">{surah.meaning} · {surah.ayahs.length} আয়াত</p>
          </div>
          <p className="font-arabic text-4xl text-primary">{surah.arName}</p>
        </div>
        <p className="font-bangla mt-4 text-sm text-muted-foreground">{surah.intro}</p>
        <div className="paper-card mt-4 rounded-2xl p-4">
          <p className="font-bangla text-xs text-muted-foreground">তাজবিদ ফোকাস</p>
          <p className="font-bangla mt-1 text-sm">{surah.focus}</p>
        </div>
        <div className="paper-card mt-4 rounded-2xl p-4">
          <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">প্রেক্ষাপট</p>
          <p className="font-bangla mt-2 text-sm text-foreground/90">{surah.context}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <ol className="mt-4 space-y-3">
          {surah.ayahs.map((a: Ayah, i: number) => {
            const done = doneSet.has(i);
            return (
              <li
                key={i}
                className={`paper-card group rounded-2xl p-5 transition ${done ? "ring-1 ring-primary/30" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-arabic text-lg text-primary/70">﴿{toArabicNum(i + 1)}﴾</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => play(i)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"
                      aria-label="play ayah"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => markDone(i)}
                      disabled={done}
                      className={`grid h-10 w-10 place-items-center rounded-full transition ${
                        done ? "bg-emerald-100 text-emerald-700" : "bg-secondary text-foreground/60 hover:bg-accent"
                      }`}
                      aria-label="mark done"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-arabic mt-2 text-right text-3xl leading-[2.2] text-foreground md:text-4xl">{a.ar}</p>
                <p className="font-bangla mt-3 text-xs italic text-muted-foreground">{a.translit}</p>
                <p className="font-bangla mt-1 text-sm text-foreground/85">{a.bn}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 text-center">
          <Link to="/quiz" className="font-bangla inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90">
            শেষে কুইজ দিন →
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function toArabicNum(n: number) {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}
