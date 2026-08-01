import type { Metadata } from "next";
import { LearnHub } from "@/components/learn/LearnHub";

export const metadata: Metadata = {
  title: "Learn Academy",
  description:
    "Story-driven electronics lessons — electricity, LEDs, resistors and breadboards, explained visually for beginners.",
};

export default function LearnPage() {
  return <LearnHub />;
}
