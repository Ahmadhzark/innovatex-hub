import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WEEKS, getWeek } from "@/data/weeks";
import { WeekView } from "@/components/weeks/WeekView";

type Props = { params: Promise<{ number: string }> };

export function generateStaticParams() {
  return WEEKS.map((week) => ({ number: String(week.number) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const week = getWeek(Number(number));
  if (!week) return {};

  return {
    title: `Week ${week.number} — ${week.title.en}`,
    description: week.teaser.en,
  };
}

export default async function WeekPage({ params }: Props) {
  const { number } = await params;
  const week = getWeek(Number(number));
  if (!week) notFound();

  return <WeekView week={week} />;
}
