import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Buildable robotics and IoT projects — obstacle avoiding robots, weather stations, smart home control and more.",
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
