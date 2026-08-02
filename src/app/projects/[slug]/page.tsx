import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/data/projects";
import { ProjectView } from "@/components/projects/ProjectView";

type Props = { params: Promise<{ slug: string }> };

/** Every project is pre-rendered at build time for the static export. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title.en,
    description: project.description.en,
    openGraph: {
      type: "article",
      title: project.title.en,
      description: project.description.en,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectView project={project} />;
}
