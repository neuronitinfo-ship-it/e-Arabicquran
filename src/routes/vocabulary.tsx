import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { quranWords } from "@/data/arabic";
import { speakArabic } from "@/lib/speak";
import { Volume2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "কুরআনিক শব্দভাণ্ডার — e-Arabicquran" },
      { name: "description", content: "কুরআনে সর্বাধিক ব্যবহৃত আরবি শব্দ — বাংলা অর্থ, উচ্চারণ ও পুনরাবৃত্তিসহ।" },
      { property: "og:title", content: "কুরআনের সর্বাধিক ব্যবহৃত শব্দ" },
      { property: "og:description", content: "কয়েকশো শব্দ শিখলেই কুরআনের অধিকাংশ আয়াত বোঝা যায়।" },
    ],
  }),
  component: VocabPage,
});

function VocabPage() {
  const [q, setQ] = useState("");
  const filtered = quranWords.filter(
    (w) =>
      w.translit.toLowerCase().includes(q.toLowerCase()) ||
      w.bn.includes(q) ||
      w.ar.includes(q),
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">ধাপ ০২</p>
        <h1 className="mt-2 text-5xl md:text-6xl">
          কুরআনিক <span className="italic text-primary">শব্দভাণ্ডার</span>
        </h1>
        <p className="font-bangla mt-3 max-w-2xl text-muted-foreground">
          গবেষণায় দেখা যায়, মাত্র ৩০০ শব্দ শিখলে কুরআনের প্রায় ৭০% আয়াত বোঝা সম্ভব।
          নিচে শুরু করার জন্য সর্বাধিক ব্যবহৃত মূল শব্দগুলো — পুনরাবৃত্তির সংখ্যাসহ।
        </p>

        <div className="mt-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="অনুসন্ধান... (বাংলা / আরবি / English)"
            className="font-bangla w-full max-w-md rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="ornament-divider mt-8 w-40 opacity-60" />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <div key={w.translit} className="paper-card flex items-start justify-between rounded-2xl p-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <div className="font-arabic text-4xl text-foreground">{w.ar}</div>
                  <div className="text-xs tracking-wider text-muted-foreground/80">{w.translit}</div>
                </div>
                <div className="font-bangla mt-2 text-foreground">{w.bn}</div>
                <div className="font-bangla mt-2 text-[11px] text-muted-foreground">
                  কুরআনে এসেছে ~{w.count} বার
                </div>
              </div>
              <button
                onClick={() => speakArabic(w.ar)}
                className="ml-3 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"
                aria-label="শুনুন"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="font-bangla mt-12 text-center text-muted-foreground">
            কোনো শব্দ পাওয়া যায়নি।
          </p>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
