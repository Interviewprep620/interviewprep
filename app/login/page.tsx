import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = {
  title: "Sign in | InterviewPrep",
  description: "Sign in to InterviewPrep.",
};

type LoginPageProps = {
  searchParams: Promise<{ configuration?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const initialMessage =
    params.configuration === "missing"
      ? "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to enable sign-in."
      : params.error === "callback"
        ? "Email confirmation could not be completed. Please try signing in again."
        : undefined;

  return <AuthPage initialMessage={initialMessage} mode="login" />;
}
