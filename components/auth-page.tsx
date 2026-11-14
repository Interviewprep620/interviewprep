"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, Mic2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthPageProps = {
  mode: "login" | "signup";
  initialMessage?: string;
};

export function AuthPage({ mode, initialMessage }: AuthPageProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(initialMessage ?? "");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      isSignup &&
      formData.get("password") !== formData.get("confirmPassword")
    ) {
      setMessageType("error");
      setMessage("The passwords do not match.");
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const email = String(formData.get("email") ?? "");
      const password = String(formData.get("password") ?? "");

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: String(formData.get("name") ?? "") },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (!data.session) {
          setMessageType("success");
          setMessage("Check your email to confirm your account, then sign in.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to authenticate. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <main className="auth-page">
      <div className="auth-topbar">
        <Link className="auth-brand" href="/">
          <span className="auth-brand-icon"><Mic2 size={18} /></span>
          <span>interviewprep</span>
        </Link>
        <Link className="auth-back-link" href="/">
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>

      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-heading">
          <div className="auth-mark"><Mic2 size={20} /></div>
          <p className="auth-eyebrow">
            {isSignup ? "YOUR NEXT CHAPTER STARTS HERE" : "WELCOME BACK"}
          </p>
          <h1 id="auth-title">
            {isSignup ? "Create your account" : "Good to see you again"}
          </h1>
          <p className="auth-subtitle">
            {isSignup
              ? "Build confidence, one practice session at a time."
              : "Pick up where you left off and keep getting interview-ready."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-name">Your name</label>
              <input
                autoComplete="name"
                id="auth-name"
                name="name"
                placeholder="e.g. Alex Morgan"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              autoComplete="email"
              id="auth-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="auth-password">Password</label>
              {!isSignup && <span className="auth-hint">At least 8 characters</span>}
            </div>
            <div className="auth-password-wrap">
              <input
                autoComplete={isSignup ? "new-password" : "current-password"}
                id="auth-password"
                minLength={8}
                name="password"
                placeholder="Enter your password"
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="auth-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">Confirm password</label>
              <input
                autoComplete="new-password"
                id="auth-confirm-password"
                minLength={8}
                name="confirmPassword"
                placeholder="Enter your password again"
                required
                type={showPassword ? "text" : "password"}
              />
            </div>
          )}

          <button className="auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? "Please wait..."
              : isSignup
                ? "Create account"
                : "Sign in"}
          </button>

          {message && (
            <p
              className={`auth-status auth-status-${messageType}`}
              role={messageType === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to InterviewPrep?"}{" "}
          <Link href={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>

        <p className="auth-preview-note">
          {isSupabaseConfigured
            ? "Your account is secured with Supabase authentication."
            : "Authentication setup required: add the Supabase URL and anon key to .env.local."}
        </p>
      </section>

      <footer className="auth-footer">
        Practice with purpose. Show up with confidence.
      </footer>
    </main>
  );
}
