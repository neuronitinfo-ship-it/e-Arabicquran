import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { speakArabic } from "@/lib/speak";
import { surahs } from "@/data/surahs";
import { Volume2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "কুরআন পাঠ ও তাজবিদ — e-Arabicquran" },
      { name: "description", content: "engineerstechbd.com-এর ফ্রি অ্যাপ — বাংলা প্রেক্ষাপট, তাজবিদ ও আয়াত-ভিত্তিক শেখার সহায়িকা।" },
    ],
  }),
  component: QuranPage,
});

function QuranPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-5 pt-12 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">ধাপ ০৪</p>
        <h1 className="mt-2 text-5xl md:text-6xl">
          কুরআন <span className="italic text-primary">পাঠের পদ্ধতি</span>
        </h1>
        <p className="font-bangla mt-3 text-muted-foreground">
          কুরআন সঠিকভাবে তিলাওয়াত করার নিয়মকে ‘তাজবিদ’ বলে। শুরুতেই গভীরে যাওয়ার দরকার নেই — কয়েকটি মূল ধারণা বুঝলেই সুন্দর পাঠ সম্ভব।
        </p>
        <p className="font-bangla mt-3 text-muted-foreground">
          প্রতিটি সূরায় বাংলা প্রেক্ষাপট ও আয়াত-ভিত্তিক ব্যাখ্যা আছে, যাতে পাঠের সাথে সাথে অর্থও ভালোভাবে গেঁথে যায়।
        </p>
        <div className="ornament-divider mt-8 w-40 opacity-60" />
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">প্রেক্ষাপট ও রেফারেন্স</p>
            <h2 className="mt-2 text-3xl">আয়াতের বাংলা গল্প</h2>
          </div>
          <p className="font-bangla text-sm text-muted-foreground max-w-xl">
            প্রতিটি সূরার বাংলা প্রেক্ষাপটের মাধ্যমে অর্থ বুঝুন এবং তাজবিদ শেখার সাথে সাথে ব্যাখ্যার গল্প গেঁথে নিন।
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {surahs.map((s) => (
            <article key={s.number} className="paper-card rounded-3xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bangla text-lg font-semibold">{s.bnName}</p>
                  <p className="font-bangla text-xs text-muted-foreground">{s.meaning}</p>
                </div>
                <p className="font-arabic text-2xl text-primary">{s.arName}</p>
              </div>
              <p className="font-bangla mt-4 text-sm text-muted-foreground">{s.context}</p>
              <Link
                to="/quran/$num"
                params={{ num: String(s.number) }}
                className="mt-5 inline-flex items-center gap-2 text-primary text-sm font-medium"
              >
                পুরো কাহিনি দেখুন <ChevronRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 pb-10">
        <Topic title="হরকত (স্বরচিহ্ন)" desc="আরবি হরফের উপর/নিচে থাকা ছোট চিহ্ন যা স্বরধ্বনি নির্দেশ করে।">
          <Sign ar="بَ" bn="ফাতহা — ‘আ’" t="ba" />
          <Sign ar="بِ" bn="কাসরা — ‘ই’" t="bi" />
          <Sign ar="بُ" bn="দম্মা — ‘উ’" t="bu" />
          <Sign ar="بْ" bn="সুকুন — স্বরহীন" t="b" />
          <Sign ar="بّ" bn="শাদ্দা — দ্বিগুণ" t="bb" />
        </Topic>

        <Topic title="মাদ্দ (টেনে পড়া)" desc="স্বরের পরে ا، و، ي এলে স্বর দীর্ঘ হয় — ২ মাত্রা পর্যন্ত টানা হয়।">
          <Sign ar="قَا" bn="ক্বা — দীর্ঘ ‘আ’" t="qā" />
          <Sign ar="قُو" bn="ক্বু — দীর্ঘ ‘উ’" t="qū" />
          <Sign ar="قِي" bn="ক্বি — দীর্ঘ ‘ই’" t="qī" />
        </Topic>

        <Topic title="তানবীন (দ্বৈত হরকত)" desc="শব্দের শেষে দুটি হরকত — শেষে ‘ন’ এর শব্দ যুক্ত হয়।">
          <Sign ar="بًا" bn="বান" t="ban" />
          <Sign ar="بٍ" bn="বিন" t="bin" />
          <Sign ar="بٌ" bn="বুন" t="bun" />
        </Topic>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-3xl">সূরা অনুশীলন</h2>
          <p className="font-bangla text-xs text-muted-foreground">প্রকৃত ক্বারীর তিলাওয়াত · বিনামূল্যে</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {surahs.map((s) => (
            <Link
              key={s.number}
              to="/quran/$num"
              params={{ num: String(s.number) }}
              className="paper-card group flex items-center justify-between rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-bangla text-xs text-muted-foreground">সূরা {s.number}</span>
                  <span className="font-arabic text-2xl text-primary">{s.arName}</span>
                </div>
                <div className="font-bangla mt-1 text-xl">{s.bnName}</div>
                <div className="font-bangla mt-1 text-xs text-muted-foreground">{s.focus}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Topic({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <article className="paper-card rounded-3xl p-7">
      <h3 className="font-bangla text-xl text-foreground">{title}</h3>
      <p className="font-bangla mt-1 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">{children}</div>
    </article>
  );
}

function Sign({ ar, bn, t }: { ar: string; bn: string; t: string }) {
  return (
    <button
      onClick={() => speakArabic(ar)}
      className="rounded-xl bg-secondary/60 p-3 text-center transition hover:bg-accent/40"
    >
      <div className="font-arabic text-3xl">{ar}</div>
      <div className="font-bangla mt-1 text-xs text-foreground">{bn}</div>
      <div className="text-[10px] text-muted-foreground/80">{t}</div>
    </button>
  );
}
