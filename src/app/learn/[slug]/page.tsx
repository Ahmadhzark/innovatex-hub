import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/data/lessons";
import { LessonView } from "@/components/learn/LessonView";

type Props = { params: Promise<{ slug: string }> };

/** Every lesson is pre-rendered at build time for the static export. */
export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};

  return {
    title: lesson.title.en,
    description: lesson.subtitle.en,
    openGraph: {
      type: "article",
      title: lesson.title.en,
      description: lesson.subtitle.en,
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return <LessonView lesson={lesson} />;
}
