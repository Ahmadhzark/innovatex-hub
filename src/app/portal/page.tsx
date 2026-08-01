import type { Metadata } from "next";
import { PortalView } from "@/components/portal/PortalView";

export const metadata: Metadata = {
  title: "Learning Portal",
  description:
    "Lessons, weekly blueprints, resources, assignments and downloads for InnovateX 3.0 students.",
};

export default function PortalPage() {
  return <PortalView />;
}
