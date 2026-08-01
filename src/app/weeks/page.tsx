import type { Metadata } from "next";
import { WeeksIndex } from "@/components/weeks/WeeksIndex";

export const metadata: Metadata = {
  title: "Weekly Blueprints",
  description:
    "Seven weeks of the InnovateX 3.0 workshop — plans, circuits, code, attendance and photos for every session.",
};

export default function WeeksPage() {
  return <WeeksIndex />;
}
