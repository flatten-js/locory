import { Hero } from "@/components/Hero"
import { Typography } from "@/components/Typography";


export default function Dashboard() {
  return (
    <Hero flexible>
      <Typography variant="h1" className="mb-4" asChild>
        <h1>Dashboard</h1>
      </Typography>
    </Hero>
  )
}
