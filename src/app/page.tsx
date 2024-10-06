import Link from "next/link";

import { ArrowRight } from 'lucide-react'

import { Typography } from "@/components/Typography";
import { Container } from "@/components/Container";
import { Inner } from "@/components/Inner";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <Container full asChild>
      <main>
        <Inner center>
          <Typography variant="h1" className="mb-4" asChild>
            <h1>Recreate <span className="text-[hsl(280,100%,70%)]">T3</span> App</h1>
          </Typography>
          <Typography variant="lead" className="mb-8" asChild>
            <h2>Extended version with shadcn + Docker</h2>
          </Typography>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/api/auth/signin">Get Started</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://github.com/flatten-js/recreate-t3-app.git" target="_blank">
                <ArrowRight className="mr-2 w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>
        </Inner>
      </main>
    </Container>
  );
}
