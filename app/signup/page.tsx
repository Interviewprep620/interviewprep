import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = {
  title: "Create an account | InterviewPrep",
  description: "Create your InterviewPrep account.",
};

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
