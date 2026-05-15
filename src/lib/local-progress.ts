// Guest-mode progress: stored in localStorage, mirrors server shape loosely.

export type ItemType = "letter" | "word" | "ayah";
export type Status = "new" | "learning" | "mastered";

interface LocalItem {
  item_type: ItemType;
  item_key: string;
  status: Status;
  correct_count: number;
  mistake_count: number;
  due_at: string;
}

const KEY = "lugat:progress";

function read(): Record<string, LocalItem> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function write(data: Record<string, LocalItem>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function recordLocal(item_type: ItemType, item_key: string, correct: boolean) {
  const data = read();
  const k = `${item_type}:${item_key}`;
  const prev = data[k] ?? {
    item_type,
    item_key,
    status: "new" as Status,
    correct_count: 0,
    mistake_count: 0,
    due_at: new Date().toISOString(),
  };
  prev.correct_count += correct ? 1 : 0;
  prev.mistake_count += correct ? 0 : 1;
  prev.status =
    prev.correct_count >= 4 && prev.mistake_count <= 1
      ? "mastered"
      : "learning";
  prev.due_at = new Date(Date.now() + (correct ? 24 : 1) * 3600 * 1000).toISOString();
  data[k] = prev;
  write(data);
}

export function getLocalProgress() {
  const data = read();
  const items = Object.values(data);
  const summary = {
    letter: { total: 0, mastered: 0, learning: 0 },
    word: { total: 0, mastered: 0, learning: 0 },
    ayah: { total: 0, mastered: 0, learning: 0 },
  } as Record<ItemType, { total: number; mastered: number; learning: number }>;
  for (const r of items) {
    summary[r.item_type].total += 1;
    if (r.status === "mastered") summary[r.item_type].mastered += 1;
    else if (r.status === "learning") summary[r.item_type].learning += 1;
  }
  return { items, summary };
}

export function getLocalQuizzes(): Array<{
  quiz_type: string;
  score: number;
  total: number;
  created_at: string;
}> {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("lugat:quizzes") || "[]");
  } catch {
    return [];
  }
}

export function saveLocalQuiz(q: { quiz_type: string; score: number; total: number }) {
  if (typeof window === "undefined") return;
  const list = getLocalQuizzes();
  list.unshift({ ...q, created_at: new Date().toISOString() });
  localStorage.setItem("lugat:quizzes", JSON.stringify(list.slice(0, 20)));
}
