import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { speakArabic } from "@/lib/speak";
import { Volume2 } from "lucide-react";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "আরবি ব্যাকরণ — e-Arabicquran" },
      { name: "description", content: "ইসম, ফি‘ল ও হরফ — কুরআন বুঝতে আরবি ব্যাকরণের মৌলিক ভিত্তি বাংলায়।" },
      { property: "og:title", content: "আরবি ব্যাকরণের মৌলিক ভিত্তি (বাংলায়)" },
      { property: "og:description", content: "শব্দের প্রকার, লিঙ্গ, বচন ও সর্বনাম — সরল ব্যাখ্যাসহ।" },
    ],
  }),
  component: GrammarPage,
});

function GrammarPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-5 pt-12 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">ধাপ ০৩</p>
        <h1 className="mt-2 text-5xl md:text-6xl">
          মৌলিক <span className="italic text-primary">ব্যাকরণ</span>
        </h1>
        <p className="font-bangla mt-3 text-muted-foreground">
          আরবি ভাষায় শব্দ মূলত তিন প্রকার। এই তিনটি বুঝলেই কুরআনের আয়াত গঠনের ৮০% পরিষ্কার হয়ে যায়।
        </p>
        <div className="ornament-divider mt-8 w-40 opacity-60" />
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 pb-16">
        <Concept
          arTitle="الِاسْم"
          bnTitle="ইসম (নাম / বিশেষ্য)"
          desc="যা কোনো ব্যক্তি, বস্তু, স্থান বা ভাবকে নির্দেশ করে। এতে কালের (অতীত/বর্তমান/ভবিষ্যৎ) ধারণা থাকে না।"
          examples={[
            { ar: "كِتَاب", bn: "বই", t: "kitāb" },
            { ar: "بَيْت", bn: "ঘর", t: "bayt" },
            { ar: "رَجُل", bn: "পুরুষ", t: "rajul" },
            { ar: "مُسْلِم", bn: "মুসলিম", t: "muslim" },
          ]}
        />

        <Concept
          arTitle="الْفِعْل"
          bnTitle="ফি‘ল (ক্রিয়া)"
          desc="যা কোনো কাজ বা ঘটনা প্রকাশ করে এবং একটি নির্দিষ্ট কালের সাথে জড়িত। আরবিতে তিন প্রকার — অতীত (মাদ্বী), বর্তমান/ভবিষ্যৎ (মুদারি), আদেশ (আমর)।"
          examples={[
            { ar: "كَتَبَ", bn: "সে লিখল (অতীত)", t: "kataba" },
            { ar: "يَكْتُبُ", bn: "সে লিখছে / লিখবে", t: "yaktubu" },
            { ar: "اُكْتُبْ", bn: "তুমি লেখো (আদেশ)", t: "uktub" },
          ]}
        />

        <Concept
          arTitle="الْحَرْف"
          bnTitle="হরফ (অব্যয়)"
          desc="যা একা ব্যবহৃত হলে কোনো অর্থ দেয় না, বরং ইসম বা ফি‘লের সাথে যুক্ত হয়ে অর্থ স্পষ্ট করে। যেমন বাংলায় ‘এ’, ‘থেকে’, ‘ও’ — তেমনই।"
          examples={[
            { ar: "فِي", bn: "এর মধ্যে / -এ", t: "fī" },
            { ar: "مِنْ", bn: "থেকে", t: "min" },
            { ar: "إِلَى", bn: "দিকে / প্রতি", t: "ilā" },
            { ar: "عَلَى", bn: "উপরে", t: "ʿalā" },
            { ar: "وَ", bn: "এবং", t: "wa" },
          ]}
        />

        <Concept
          arTitle="الْمُذَكَّر و الْمُؤَنَّث"
          bnTitle="লিঙ্গ — মুযাক্কার (পুং) ও মুআন্নাস (স্ত্রী)"
          desc="আরবিতে প্রতিটি শব্দের লিঙ্গ আছে। সাধারণত শব্দের শেষে ة (তা মারবূতা) থাকলে সেটি স্ত্রী লিঙ্গের।"
          examples={[
            { ar: "مُسْلِم", bn: "মুসলিম পুরুষ (পুং)", t: "muslim" },
            { ar: "مُسْلِمَة", bn: "মুসলিম নারী (স্ত্রী)", t: "muslimah" },
            { ar: "مُؤْمِن", bn: "ঈমানদার পুরুষ", t: "muʾmin" },
            { ar: "مُؤْمِنَة", bn: "ঈমানদার নারী", t: "muʾminah" },
          ]}
        />

        <Concept
          arTitle="الْعَدَد"
          bnTitle="বচন — এক, দুই, বহু"
          desc="বাংলা ও ইংরেজির মতো শুধু একবচন/বহুবচন নয়, আরবিতে দ্বিবচন (mathna) আলাদা — দুইজনের জন্য বিশেষ রূপ।"
          examples={[
            { ar: "كِتَاب", bn: "একটি বই", t: "kitāb" },
            { ar: "كِتَابَانِ", bn: "দুটি বই (দ্বিবচন)", t: "kitābāni" },
            { ar: "كُتُب", bn: "বইসমূহ (বহুবচন)", t: "kutub" },
          ]}
        />

        <Concept
          arTitle="الضَّمَائِر"
          bnTitle="সর্বনাম (যুক্ত ও পৃথক)"
          desc="‘আমার’, ‘তোমার’, ‘তার’ — এগুলো আরবিতে শব্দের শেষে যুক্ত হয়। কুরআন বুঝতে এগুলো অপরিহার্য।"
          examples={[
            { ar: "رَبِّي", bn: "আমার রব", t: "rabbī" },
            { ar: "رَبُّكَ", bn: "তোমার রব (পুং)", t: "rabbuka" },
            { ar: "رَبُّكِ", bn: "তোমার রব (স্ত্রী)", t: "rabbuki" },
            { ar: "رَبُّهُ", bn: "তার রব", t: "rabbuhu" },
            { ar: "رَبُّنَا", bn: "আমাদের রব", t: "rabbunā" },
          ]}
        />
      </section>

      <SiteFooter />
    </div>
  );
}

function Concept({
  arTitle,
  bnTitle,
  desc,
  examples,
}: {
  arTitle: string;
  bnTitle: string;
  desc: string;
  examples: { ar: string; bn: string; t: string }[];
}) {
  return (
    <article className="paper-card rounded-3xl p-7 md:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bangla text-2xl text-foreground">{bnTitle}</h2>
          <p className="font-bangla mt-2 max-w-xl text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="font-arabic shrink-0 text-3xl text-primary md:text-4xl">{arTitle}</div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {examples.map((e) => (
          <div
            key={e.t}
            className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3"
          >
            <div className="flex items-baseline gap-3">
              <div className="font-arabic text-2xl">{e.ar}</div>
              <div className="text-[11px] tracking-wider text-muted-foreground/80">{e.t}</div>
            </div>
            <div className="font-bangla flex items-center gap-3 text-sm text-foreground/80">
              {e.bn}
              <button
                onClick={() => speakArabic(e.ar)}
                className="grid h-8 w-8 place-items-center rounded-full bg-background text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
