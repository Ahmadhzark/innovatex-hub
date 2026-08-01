import type { Metadata } from "next";
import { TeamView } from "@/components/team/TeamView";

export const metadata: Metadata = {
  title: "Resource Persons",
  description:
    "The instructors and mentors delivering the InnovateX 3.0 robotics and embedded systems program.",
};

export default function TeamPage() {
  return <TeamView />;
}
