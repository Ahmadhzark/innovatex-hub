import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "About InnovateX 3.0 — a 7-week robotics and embedded systems program by Team Science for 100 students.",
};

export default function AboutPage() {
  return <AboutView />;
}
