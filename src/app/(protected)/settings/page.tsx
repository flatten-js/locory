import { api } from "@/trpc/server"

import { Container } from "@/components/Container"
import { Typography } from "@/components/Typography";

import PageClient from "./page.client";


export default async function Settings() {
  const user = await api.user.getProfile()

  return (
    <Container className="px-8" flexible>
      <Typography variant="h1" className="mb-8" asChild>
        <h1>Settings</h1>
      </Typography>
      <PageClient user={ user } />
    </Container>
  )
}
