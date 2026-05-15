import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  { to: "/", label: "হোম" },
  { to: "/today", label: "আজকের পাঠ" },
  { to: "/alphabet", label: "হরফ" },
  { to: "/vocabulary", label: "শব্দভাণ্ডার" },
  { to: "/grammar", label: "ব্যাকরণ" },
  { to: "/quran", label: "কুরআন পাঠ" },
  { to: "/flashcards", label: "ফ্ল্যাশকার্ড" },
  { to: "/quiz", label: "কুইজ" },
  { to: "/progress", label: "অগ্রগতি" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const { user, signOut, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="font-serif text-xl">e-Arabicquran</div>
            <div className="font-bangla text-[11px] text-muted-foreground">engineerstechbd.com-এর ফ্রি অ্যাপ</div>
          </div>
        </Link>
        <nav className="hidden flex-wrap items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`font-bangla rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <div className="flex items-center gap-2">
              <span className="font-bangla hidden items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80 sm:inline-flex">
                <User className="h-3 w-3" /> {user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut()}
                className="font-bangla inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:bg-secondary"
              >
                <LogOut className="h-3 w-3" /> লগআউট
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-bangla inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:opacity-90"
            >
              <LogIn className="h-3 w-3" /> লগইন
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">
        {nav.map((n) => {
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`font-bangla shrink-0 rounded-full px-3 py-1 text-xs ${
                active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center">
        <div className="ornament-divider mx-auto mb-6 w-40" />
        <p className="font-arabic text-2xl text-primary">رَبِّ زِدْنِي عِلْمًا</p>
        <p className="font-bangla mt-2 text-sm text-muted-foreground">
          “হে আমার রব, আমার জ্ঞান বৃদ্ধি করে দিন।” — সূরা ত্বহা ১১৪
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} e-Arabicquran · engineerstechbd.com-এর ফ্রি অ্যাপ
        </p>
      </div>
    </footer>
  );
}
