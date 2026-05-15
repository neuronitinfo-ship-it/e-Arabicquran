import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ArrowRight, BookOpen, Languages, Sparkles, Volume2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "e-Arabicquran — engineerstechbd.com free app" },
      { name: "description", content: "engineerstechbd.com-এর ফ্রি অ্যাপ — বাংলা ভাষায় কুরআন ভিত্তিক আরবি শেখার পূর্ণাঙ্গ পাঠ।" },
      { property: "og:title", content: "e-Arabicquran — কুরআনের ভাষা শিখুন" },
      { property: "og:description", content: "বাংলা ব্যাখ্যা, আয়াত প্রেক্ষাপট ও তাজবিদ সহ কুরআন শেখার অনলাইন অ্যাপ।" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="font-bangla inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> engineerstechbd.com-এর ফ্রি অ্যাপ
              </span>
              <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">
                কুরআনের ভাষা,
                <br />
                <span className="italic text-primary">সহজ বাংলায়।</span>
              </h1>
              <p className="font-bangla mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
                হরফ থেকে শুরু করে ব্যাকরণ, সূরা অনুশীলন ও আয়াত প্রেক্ষাপট —
                প্রতিটি ধাপ বাংলা ব্যাখ্যা ও সঠিক উচ্চারণসহ।
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/today"
                  className="font-bangla inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  আজকের পাঠ শুরু করুন <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/alphabet"
                  className="font-bangla inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm text-foreground transition hover:bg-secondary"
                >
                  হরফ শিখি
                </Link>
                <Link
                  to="/flashcards"
                  className="font-bangla inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm text-foreground transition hover:bg-secondary"
                >
                  ফ্ল্যাশকার্ড
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="paper-card rounded-3xl p-8 md:p-10">
                <div className="text-center">
                  <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">
                    আজকের আয়াত
                  </p>
                  <p className="font-arabic mt-4 text-4xl leading-[1.9] text-foreground md:text-5xl">
                    اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
                  </p>
                  <div className="ornament-divider mx-auto my-5 w-32" />
                  <p className="font-bangla text-sm text-muted-foreground">
                    “পড়ো তোমার রবের নামে, যিনি সৃষ্টি করেছেন।”
                  </p>
                  <p className="font-bangla mt-1 text-xs text-muted-foreground/80">
                    সূরা আল-আলাক ৯৬:১
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path / sections */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="ornament-divider mx-auto mb-10 w-48 opacity-70" />
        <h2 className="text-center text-4xl md:text-5xl">আপনার শেখার পথ</h2>
        <p className="font-bangla mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          চারটি সরল ধাপে — প্রতিটি ধাপ বাংলায় ব্যাখ্যা করা।
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <PathCard
            to="/alphabet"
            step="০১"
            ar="الْحُرُوف"
            title="আরবি হরফ"
            desc="২৮টি হরফ — বাংলা উচ্চারণ, শব্দের শুরু-মাঝ-শেষে রূপ ও উদাহরণ।"
            icon={<Languages className="h-5 w-5" />}
          />
          <PathCard
            to="/vocabulary"
            step="০২"
            ar="الْمُفْرَدَات"
            title="কুরআনিক শব্দভাণ্ডার"
            desc="কুরআনে সর্বাধিক ব্যবহৃত শব্দ — অর্থ, উচ্চারণ ও পুনরাবৃত্তি।"
            icon={<BookOpen className="h-5 w-5" />}
          />
          <PathCard
            to="/grammar"
            step="০৩"
            ar="النَّحْو"
            title="মৌলিক ব্যাকরণ"
            desc="ইসম, ফি‘ল, হরফ — কুরআন বুঝতে যা যা প্রয়োজন।"
            icon={<Sparkles className="h-5 w-5" />}
          />
          <PathCard
            to="/quran"
            step="০৪"
            ar="التَّجْوِيد"
            title="কুরআন পাঠ ও প্রেক্ষাপট"
            desc="মাখরাজ, সুকুন ও মাদ্দের সাথে আয়াতের বাংলা ব্যাখ্যা ও প্রেক্ষাপট।"
            icon={<Volume2 className="h-5 w-5" />}
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PathCard({
  to,
  step,
  ar,
  title,
  desc,
  icon,
}: {
  to: string;
  step: string;
  ar: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="paper-card group relative block overflow-hidden rounded-2xl p-7 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className="font-bangla text-xs tracking-widest text-muted-foreground">
          ধাপ {step}
        </span>
        <span className="font-arabic text-2xl text-primary/70">{ar}</span>
      </div>
      <h3 className="font-bangla mt-6 text-2xl text-foreground">{title}</h3>
      <p className="font-bangla mt-2 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-6 flex items-center gap-2 text-sm text-primary">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="font-bangla transition group-hover:translate-x-0.5">শুরু করুন</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
