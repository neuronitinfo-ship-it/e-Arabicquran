// Speak Arabic text using the browser's Web Speech API (no API key required).
// Picks an Arabic voice when available; falls back to the default.

let voicesReady = false;
function ensureVoicesLoaded() {
  if (voicesReady || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  // Trigger voice list load (some browsers populate asynchronously)
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    voicesReady = true;
  };
}

export function speakArabic(text: string, opts?: { rate?: number }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  ensureVoicesLoaded();
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    u.rate = opts?.rate ?? 0.7;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const arVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("ar-sa")) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("ar"));
    if (arVoice) u.voice = arVoice;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore
  }
}

// Play an audio URL (used for ayah audio from everyayah.com).
let currentAudio: HTMLAudioElement | null = null;
export function playAyah(surah: number, ayah: number) {
  const s = String(surah).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  playAudio(`https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${s}${a}.mp3`);
}

export function playAudio(url: string) {
  if (typeof window === "undefined") return;
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    const a = new Audio(url);
    currentAudio = a;
    void a.play().catch(() => {});
  } catch {
    // ignore
  }
}
