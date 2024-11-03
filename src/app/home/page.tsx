'use client'

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { Hero } from "@/components/Hero";
import { Typography } from "@/components/Typography";


export default function Home() {
  return (
    <Hero>
      <Typography variant="h1" className="mb-4" asChild>
        <h1>Home</h1>
      </Typography>
      <Typography variant="lead" wrap className="mb-8 justify-center" asChild>
        <h2>This is a protected page</h2>
      </Typography>
      <Button onClick={() => signOut()}>Logout</Button>
    </Hero>
  )
}
