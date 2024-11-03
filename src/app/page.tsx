import Link from "next/link";

import { ArrowRight } from 'lucide-react'

import { Typography } from "@/components/Typography";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

import { env } from "@/env";


export default async function TopPage() {
  return (
    <Hero className="overflow-hidden" asChild>
      <main>
        <Typography variant="h1" className="mb-4" asChild>
          <h1>Recreate <span className="text-[hsl(280,100%,70%)]">T3</span> App</h1>
        </Typography>
        <Typography variant="lead" wrap className="mb-8 justify-center" asChild>
          <h2>Extended version with&nbsp;<span>shadcn + Docker</span></h2>
        </Typography>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={env.NEXT_PUBLIC_LOGIN_PATH}>Get Started</Link>
          </Button>
          <Button variant="ghost" asChild>
            <a href="https://github.com/flatten-js/recreate-t3-app.git" target="_blank">
              <ArrowRight className="mr-2 w-4 h-4" />
              GitHub
            </a>
          </Button>
        </div>

        <Hero background>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            className={"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] opacity-50 skew-y-12"}
          />
        </Hero>
      </main>
    </Hero>
  );
}
