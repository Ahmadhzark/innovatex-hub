import { Hero } from "@/components/sections/Hero";
import { ProgressWidget } from "@/components/sections/ProgressWidget";
import { Stats } from "@/components/sections/Stats";
import { Journey } from "@/components/sections/Journey";
import { Modules } from "@/components/sections/Modules";
import { HardwareMarquee } from "@/components/sections/HardwareMarquee";
import { CallToAction } from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgressWidget />
      <Stats />
      <HardwareMarquee />
      <Journey />
      <Modules />
      <CallToAction />
    </>
  );
}
