// Build today's mini-plan: 5 letters + 5 words + 1 ayah.
// Deterministic per calendar day so refreshing keeps the same plan.

import { letters, quranWords } from "@/data/arabic";
import { surahs } from "@/data/surahs";

function dayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function pick<T>(arr: T[], n: number, offset: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(offset + i) % arr.length]);
  return out;
}

export type TodayStep =
  | { kind: "letter"; key: string; ar: string; bn: string; sub: string }
  | { kind: "word"; key: string; ar: string; bn: string; sub: string }
  | { kind: "ayah"; key: string; ar: string; bn: string; sub: string; surah: number; ayah: number };

export function getTodayPlan(): {
  date: string;
  steps: TodayStep[];
} {
  const d = dayIndex();
  const date = new Date().toISOString().slice(0, 10);

  const letterSet = pick(letters, 5, d * 5);
  const wordSet = pick(quranWords, 5, d * 5);
  const surah = surahs[d % surahs.length];
  const ayah = surah.ayahs[d % surah.ayahs.length];

  const steps: TodayStep[] = [
    ...letterSet.map((l) => ({
      kind: "letter" as const,
      key: l.translit,
      ar: l.isolated,
      bn: l.bnName,
      sub: l.sound,
    })),
    ...wordSet.map((w) => ({
      kind: "word" as const,
      key: w.translit,
      ar: w.ar,
      bn: w.bn,
      sub: `${w.translit} · ${w.count}× কুরআনে`,
    })),
    {
      kind: "ayah",
      key: `${surah.number}:${surah.ayahs.indexOf(ayah) + 1}`,
      ar: ayah.ar,
      bn: ayah.bn,
      sub: `${surah.bnName} · আয়াত ${surah.ayahs.indexOf(ayah) + 1}`,
      surah: surah.number,
      ayah: surah.ayahs.indexOf(ayah) + 1,
    },
  ];

  return { date, steps };
}

const COMPLETE_KEY = "lugat:today-complete";
export function getCompletionDate(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COMPLETE_KEY);
}
export function markTodayComplete() {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPLETE_KEY, new Date().toISOString().slice(0, 10));
}
