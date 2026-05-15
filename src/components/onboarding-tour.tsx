import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, ChevronRight, Sparkles } from "lucide-react";

const KEY = "lugat:onboarded";

const steps = [
  {
    title: "স্বাগতম!",
    body: "e-Arabicquran — engineerstechbd.com-এর ফ্রি অ্যাপ। বাংলায় কুরআনের ভাষা শেখার সহজ পথ। চলুন এক মিনিটে ঘুরে দেখি।",
    ar: "أَهْلًا وَسَهْلًا",
  },
  {
    title: "প্রতিদিন একটু",
    body: "‘আজকের পাঠ’-এ মাত্র ৫টি হরফ, ৫টি শব্দ ও ১টি আয়াত — অভ্যাস ধরে রাখুন।",
    ar: "كُلَّ يَوْمٍ قَلِيلًا",
  },
  {
    title: "অফলাইনেও চলে",
    body: "ইন্টারনেট না থাকলেও ফ্ল্যাশকার্ড, কুইজ ও আগে শোনা তিলাওয়াত চালু থাকবে।",
    ar: "بِدُونِ ٱلْإِنْتَرْنِت",
  },
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  function close() {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  }

  if (!open) return null;
  const step = steps[i];
  const last = i === steps.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="পরিচিতি ট্যুর"
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 backdrop-blur-sm sm:items-center"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
        if (e.key === "Enter") (last ? close() : setI(i + 1));
      }}
    >
      <div className="paper-card relative w-full max-w-md rounded-3xl p-7 shadow-2xl">
        <button
          onClick={close}
          aria-label="বন্ধ করুন"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-bangla">পরিচিতি · {i + 1}/{steps.length}</span>
        </div>
        <p className="font-arabic mt-3 text-3xl text-primary">{step.ar}</p>
        <h2 className="font-bangla mt-2 text-2xl">{step.title}</h2>
        <p className="font-bangla mt-3 text-sm text-muted-foreground">{step.body}</p>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={close}
            className="font-bangla text-xs text-muted-foreground hover:text-foreground"
          >
            এড়িয়ে যান
          </button>
          {last ? (
            <Link
              to="/today"
              onClick={close}
              className="font-bangla inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
            >
              শুরু করি <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              autoFocus
              onClick={() => setI(i + 1)}
              className="font-bangla inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
            >
              পরবর্তী <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
