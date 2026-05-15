import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "লগইন — e-Arabicquran" },
      { name: "description", content: "e-Arabicquran-এ লগইন বা সাইনআপ করুন এবং আপনার শেখার অগ্রগতি সংরক্ষণ করুন।" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/progress" });
  }, [user, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("সাইনআপ সফল! আপনার ইমেইল চেক করুন।");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("স্বাগতম!");
        navigate({ to: "/progress" });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "কিছু একটা ভুল হয়েছে");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google লগইন ব্যর্থ");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-16">
        <div className="paper-card rounded-3xl p-8">
          <div className="text-center">
            <h1 className="text-4xl">{mode === "signin" ? "স্বাগতম" : "একাউন্ট খুলুন"}</h1>
            <p className="font-bangla mt-2 text-sm text-muted-foreground">
              আপনার অগ্রগতি সব ডিভাইসে সিঙ্ক রাখতে লগইন করুন।
            </p>
          </div>

          <button
            onClick={google}
            disabled={busy}
            className="font-bangla mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-2.5 text-sm hover:bg-secondary disabled:opacity-60"
          >
            <GoogleIcon /> Google দিয়ে চালিয়ে যান
          </button>

          <div className="font-bangla my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> অথবা ইমেইল <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <Field icon={<Mail className="h-4 w-4" />} type="text" placeholder="আপনার নাম" value={name} onChange={setName} />
            )}
            <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder="ইমেইল" value={email} onChange={setEmail} required />
            <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder="পাসওয়ার্ড (≥ ৬ অক্ষর)" value={password} onChange={setPassword} required minLength={6} />
            <button
              disabled={busy}
              className="font-bangla flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "লগইন করুন" : "সাইনআপ করুন"}
            </button>
          </form>

          <p className="font-bangla mt-5 text-center text-xs text-muted-foreground">
            {mode === "signin" ? (
              <>
                নতুন ব্যবহারকারী?{" "}
                <button onClick={() => setMode("signup")} className="text-primary underline">
                  সাইনআপ করুন
                </button>
              </>
            ) : (
              <>
                ইতিমধ্যে একাউন্ট আছে?{" "}
                <button onClick={() => setMode("signin")} className="text-primary underline">
                  লগইন করুন
                </button>
              </>
            )}
          </p>
          <p className="font-bangla mt-3 text-center text-[11px] text-muted-foreground">
            <Link to="/" className="underline">একাউন্ট ছাড়াও</Link> অ্যাপ ব্যবহার করতে পারেন (অগ্রগতি শুধু এই ডিভাইসে থাকবে)।
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  icon, type, placeholder, value, onChange, required, minLength,
}: {
  icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean; minLength?: number;
}) {
  return (
    <label className="font-bangla flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm focus-within:ring-2 focus-within:ring-ring">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.6l-6-5.1c-1.9 1.4-4.3 2.2-7 2.2-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.7 39 16.3 43.5 24 43.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.3 5.5l6 5.1c-.4.4 6.5-4.7 6.5-14.6 0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}
