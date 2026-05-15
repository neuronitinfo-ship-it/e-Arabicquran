// Unified tracker — saves to Supabase when signed in, localStorage always,
// and queues to retry when offline / Supabase unreachable.
import { recordAnswer, saveQuizResult } from "./progress.functions";
import { recordLocal, saveLocalQuiz, type ItemType } from "./local-progress";
import { queueAnswer, queueQuiz } from "./practice-queue";

function isOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine !== false;
}

export async function trackAnswer(
  isAuthed: boolean,
  item_type: ItemType,
  item_key: string,
  correct: boolean,
) {
  recordLocal(item_type, item_key, correct);
  if (!isAuthed) return;
  if (!isOnline()) {
    queueAnswer({ item_type, item_key, correct });
    return;
  }
  try {
    await recordAnswer({ data: { item_type, item_key, correct } });
  } catch (e) {
    console.warn("recordAnswer failed, queued", e);
    queueAnswer({ item_type, item_key, correct });
  }
}

export async function trackQuiz(
  isAuthed: boolean,
  q: { quiz_type: string; score: number; total: number; mistakes: string[]; duration_seconds: number },
) {
  saveLocalQuiz({ quiz_type: q.quiz_type, score: q.score, total: q.total });
  if (!isAuthed) return;
  if (!isOnline()) {
    queueQuiz(q);
    return;
  }
  try {
    await saveQuizResult({ data: q });
  } catch (e) {
    console.warn("saveQuizResult failed, queued", e);
    queueQuiz(q);
  }
}
