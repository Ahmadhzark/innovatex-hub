import type { Metadata } from "next";
import { RegisterView } from "@/components/register/RegisterView";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for InnovateX 3.0 — a 7-week robotics and embedded systems workshop by Team Science.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
