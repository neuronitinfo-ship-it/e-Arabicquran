import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useAuth } from "@/hooks/use-auth";
import { getProgress, getRecentQuizzes } from "@/lib/progress.functions";
import { getLocalProgress, getLocalQuizzes } from "@/lib/local-progress";
import { letters, quranWords } from "@/data/arabic";
import { Trophy, Sparkles, BookOpen, Languages } from "lucide-react";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "অগ্রগতি — e-Arabicquran" },
      { name: "description", content: "আপনার শেখার অগ্রগতি — হরফ, শব্দ ও আয়াতে কতটুকু এগিয়েছেন দেখুন।" },
    ],
  }),
  component: ProgressPage,
});

interface Summary { total: number; mastered: number; learning: number }
type Sums = Record<"letter" | "word" | "ayah", Summary>;

function ProgressPage() {
  const { user, loading } = useAuth();
  const [sums, setSums] = useState<Sums | null>(null);
  const [quizzes, setQuizzes] = useState<Array<{ quiz_type: string; score: number; total: number; created_at: string }>>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (user) {
        try {
          const p = await getProgress();
          const q = await getRecentQuizzes();
          if (!cancelled) {
            setSums(p.summary as Sums);
            setQuizzes(q.items);
          }
          return;
        } catch (e) {
          console.warn(e);
        }
      }
      const local = getLocalProgress();
      if (!cancelled) {
        setSums(local.summary as Sums);
        setQuizzes(getLocalQuizzes());
      }
    }
    if (!loading) load();
    return () => { cancelled = true; };
  }, [user, loading]);

  const totals = {
    letter: { goal: letters.length, ...(sums?.letter ?? { total: 0, mastered: 0, learning: 0 }) },
    word: { goal: quranWords.length, ...(sums?.word ?? { total: 0, mastered: 0, learning: 0 }) },
    ayah: { goal: 33, ...(sums?.ayah ?? { total: 0, mastered: 0, learning: 0 }) },
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-6">
        <p className="font-bangla text-xs uppercase tracking-widest text-muted-foreground">ড্যাশবোর্ড</p>
        <h1 className="mt-2 text-5xl">আপনার অগ্রগতি</h1>
        <p className="font-bangla mt-2 text-sm text-muted-foreground">
          {user ? `${user.email} হিসেবে — সব ডিভাইসে সিঙ্ক।` : (
            <>অতিথি মোড — শুধু এই ডিভাইসে। <Link to="/login" className="text-primary underline">লগইন করে</Link> সিঙ্ক করুন।</>
          )}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 pb-6 md:grid-cols-3">
        <StatCard icon={<Languages className="h-4 w-4" />} title="হরফ" mastered={totals.letter.mastered} learning={totals.letter.learning} goal={totals.letter.goal} />
        <StatCard icon={<BookOpen className="h-4 w-4" />} title="শব্দ" mastered={totals.word.mastered} learning={totals.word.learning} goal={totals.word.goal} />
        <StatCard icon={<Sparkles className="h-4 w-4" />} title="আয়াত" mastered={totals.ayah.mastered} learning={totals.ayah.learning} goal={totals.ayah.goal} />
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="paper-card rounded-3xl p-7">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="font-bangla text-lg">সাম্প্রতিক কুইজ</h2>
          </div>
          {quizzes.length === 0 ? (
            <p className="font-bangla mt-3 text-sm text-muted-foreground">
              এখনো কোনো কুইজ নেই। <Link to="/quiz" className="text-primary underline">প্রথম কুইজ শুরু করুন</Link>।
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {quizzes.map((q, i) => (
                <li key={i} className="font-bangla flex items-center justify-between py-3 text-sm">
                  <span>
                    {q.quiz_type === "letters_mcq" ? "হরফ কুইজ" : q.quiz_type === "words_mcq" ? "শব্দ কুইজ" : q.quiz_type}
                    <span className="ml-2 text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString("bn-BD")}</span>
                  </span>
                  <span className="font-semibold">{q.score} / {q.total}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Link to="/flashcards" className="paper-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
            <div className="font-bangla text-sm text-muted-foreground">পরবর্তী ধাপ</div>
            <div className="font-bangla mt-1 text-lg">ফ্ল্যাশকার্ড অনুশীলন →</div>
          </Link>
          <Link to="/quiz" className="paper-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
            <div className="font-bangla text-sm text-muted-foreground">নিজেকে যাচাই</div>
            <div className="font-bangla mt-1 text-lg">কুইজ দিন →</div>
          </Link>
          <Link to="/quran" className="paper-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
            <div className="font-bangla text-sm text-muted-foreground">তিলাওয়াত</div>
            <div className="font-bangla mt-1 text-lg">সূরা অনুশীলন →</div>
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function StatCard({
  icon, title, mastered, learning, goal,
}: { icon: React.ReactNode; title: string; mastered: number; learning: number; goal: number }) {
  const pct = Math.min(100, Math.round((mastered / goal) * 100));
  return (
    <div className="paper-card rounded-3xl p-6">
      <div className="font-bangla flex items-center gap-2 text-sm text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
        {title}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl">{mastered}</span>
        <span className="font-bangla text-sm text-muted-foreground">/ {goal} আয়ত্তে</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="font-bangla mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>শিখছেন: {learning}</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}
