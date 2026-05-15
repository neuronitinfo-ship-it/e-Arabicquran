import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { letters, type ArabicLetter } from "@/data/arabic";
import { speakArabic } from "@/lib/speak";
import { Volume2, X } from "lucide-react";

export const Route = createFileRoute("/alphabet")({
  head: () => ({
    meta: [
      { title: "আরবি হরফ — e-Arabicquran" },
      { name: "description", content: "২৮টি আরবি হরফ — বাংলা উচ্চারণ, শব্দের শুরু-মাঝ-শেষে রূপ ও কুরআনিক উদাহরণ।" },
      { property: "og:title", content: "আরবি হরফ শিখুন বাংলায়" },
      { property: "og:description", content: "প্রতিটি হরফের বাংলা ব্যাখ্যা, রূপ ও উচ্চারণসহ।" },
    ],
  }),
  component: AlphabetPage,
});

function AlphabetPage() {
  const [active, setActive] = useState<ArabicLetter | null>(null);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">
          ধাপ ০১
        </p>
        <h1 className="mt-2 text-5xl md:text-6xl">
          আরবি <span className="italic text-primary">হরফ</span>
        </h1>
        <p className="font-bangla mt-3 max-w-2xl text-muted-foreground">
          আরবি ভাষায় ২৮টি মৌলিক হরফ আছে। প্রতিটি কার্ডে চাপ দিয়ে বিস্তারিত উচ্চারণ ও উদাহরণ দেখুন।
          ডান দিকের <span className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5"><Volume2 className="h-3 w-3" /></span> চিহ্নে চাপ দিলে শব্দ শোনা যাবে।
        </p>
        <div className="ornament-divider mt-8 w-40 opacity-60" />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {letters.map((l, i) => (
            <button
              key={l.translit}
              onClick={() => setActive(l)}
              className="paper-card group relative aspect-square rounded-2xl p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-bangla absolute top-2 left-3 text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakArabic(l.isolated);
                }}
                className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-secondary text-foreground/60 opacity-0 transition group-hover:opacity-100 hover:text-primary"
                aria-label={`Play ${l.translit}`}
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
              <div className="flex h-full flex-col items-center justify-center">
                <div className="font-arabic text-5xl text-foreground md:text-6xl">{l.isolated}</div>
                <div className="font-bangla mt-2 text-sm text-muted-foreground">{l.bnName}</div>
                <div className="text-[10px] tracking-wider text-muted-foreground/70">{l.translit}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {active && <LetterDetail letter={active} onClose={() => setActive(null)} />}

      <SiteFooter />
    </div>
  );
}

function LetterDetail({ letter, onClose }: { letter: ArabicLetter; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="paper-card relative w-full max-w-lg rounded-3xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-secondary hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="font-arabic text-8xl text-foreground">{letter.isolated}</div>
          <div className="font-bangla mt-2 text-2xl">{letter.bnName}</div>
          <div className="text-xs tracking-widest text-muted-foreground">{letter.translit}</div>
          <button
            onClick={() => speakArabic(letter.isolated)}
            className="font-bangla mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <Volume2 className="h-3.5 w-3.5" /> উচ্চারণ শুনুন
          </button>
        </div>

        <div className="ornament-divider my-6 w-32 mx-auto" />

        <div>
          <h4 className="font-bangla text-sm font-semibold text-muted-foreground">উচ্চারণ</h4>
          <p className="font-bangla mt-1 text-foreground">{letter.sound}</p>
        </div>

        <div className="mt-6">
          <h4 className="font-bangla text-sm font-semibold text-muted-foreground">শব্দে রূপ</h4>
          <div className="mt-2 grid grid-cols-4 gap-2 text-center">
            {[
              { label: "শুরুতে", v: letter.initial },
              { label: "মাঝে", v: letter.medial },
              { label: "শেষে", v: letter.final },
              { label: "একক", v: letter.isolated },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-secondary/60 p-3">
                <div className="font-arabic text-3xl">{f.v}</div>
                <div className="font-bangla mt-1 text-[11px] text-muted-foreground">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-bangla text-sm font-semibold text-muted-foreground">উদাহরণ</h4>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-secondary/60 p-4">
            <div>
              <div className="font-arabic text-3xl">{letter.example.ar}</div>
              <div className="font-bangla mt-1 text-sm">{letter.example.bn}</div>
              <div className="text-[11px] text-muted-foreground">{letter.example.translit}</div>
            </div>
            <button
              onClick={() => speakArabic(letter.example.ar)}
              className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
