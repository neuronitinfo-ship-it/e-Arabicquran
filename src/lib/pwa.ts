// Service-worker registration with strict guards.
// Never registers inside Lovable preview iframes — those contexts cause stale
// caches and broken navigation. Only runs in production builds on real hosts.

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  // Guard 1: never register inside any iframe (Lovable preview, embeds, etc.)
  let inIframe = true;
  try {
    inIframe = window.self !== window.top;
  } catch {
    inIframe = true;
  }

  // Guard 2: never register on Lovable preview hosts
  const host = window.location.hostname;
  const isPreviewHost =
    host.includes("id-preview--") ||
    host.endsWith(".lovableproject.com") ||
    host.endsWith(".lovable.app") && host.includes("-dev");
  // Note: production lovable.app deployments are still allowed below.

  if (inIframe || isPreviewHost) {
    // Aggressively unregister anything previously installed to avoid stale shells.
    navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
    return;
  }

  // Only register in production (Vite sets DEV=true in dev).
  if (import.meta.env.DEV) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => console.warn("[pwa] SW registration failed", err));
  });
}
