// Offline-first practice queue.
// trackAnswer / trackQuiz enqueue here whenever the network is unreachable
// or the user is signed out + online but Supabase request fails. When the
// browser comes back online (or the user signs in), flushQueue() drains it.

import { recordAnswer, saveQuizResult } from "./progress.functions";
import type { ItemType } from "./local-progress";

type AnswerJob = {
  kind: "answer";
  item_type: ItemType;
  item_key: string;
  correct: boolean;
  ts: number;
};
type QuizJob = {
  kind: "quiz";
  payload: {
    quiz_type: string;
    score: number;
    total: number;
    mistakes: string[];
    duration_seconds: number;
  };
  ts: number;
};
type Job = AnswerJob | QuizJob;

const KEY = "lugat:queue";

function read(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(jobs: Job[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(jobs));
}

export function queueAnswer(j: Omit<AnswerJob, "kind" | "ts">) {
  write([...read(), { kind: "answer", ts: Date.now(), ...j }]);
}
export function queueQuiz(payload: QuizJob["payload"]) {
  write([...read(), { kind: "quiz", ts: Date.now(), payload }]);
}

export function queueSize() {
  return read().length;
}

let flushing = false;
export async function flushQueue(isAuthed: boolean) {
  if (!isAuthed) return;
  if (typeof navigator !== "undefined" && navigator.onLine === false) return;
  if (flushing) return;
  flushing = true;
  try {
    let jobs = read();
    const remaining: Job[] = [];
    for (const j of jobs) {
      try {
        if (j.kind === "answer") {
          await recordAnswer({
            data: { item_type: j.item_type, item_key: j.item_key, correct: j.correct },
          });
        } else {
          await saveQuizResult({ data: j.payload });
        }
      } catch {
        remaining.push(j);
      }
    }
    write(remaining);
  } finally {
    flushing = false;
  }
}

export function setupAutoFlush(getAuthed: () => boolean) {
  if (typeof window === "undefined") return;
  const tick = () => flushQueue(getAuthed());
  window.addEventListener("online", tick);
  // Try once on load and periodically
  setTimeout(tick, 1500);
  const id = window.setInterval(tick, 60_000);
  return () => {
    window.removeEventListener("online", tick);
    window.clearInterval(id);
  };
}
