import type { Metadata } from "next";
import { GalleryView } from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from the InnovateX 3.0 workshop sessions and the ten team showcases.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
