'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Hero } from "@/components/Hero";
import { Typography } from "@/components/Typography";

import { usePage, State } from "./page.hooks";
import type { States } from "./page.hooks";

export default function LoginPage() {
  const { 
    state, 
    form,
    handleSubmit
  } = usePage();

  return (
    <Hero asChild>
      <main>
        <Typography variant="h1" className="mb-8" asChild>
          <h1>Welcome</h1>
        </Typography>

        <div className="w-10/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          {
            ([State.INITIAL, State.PROCESSING] as States[]).includes(state) ? (
              <Form key="email" {...form}>
                <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={state == State.PROCESSING}>Continue</Button>
                </form>
              </Form>
            ) : state == State.SUCCESS && (
              <div className="text-center">
                <Typography variant="h3" className="mb-4" asChild>
                  <h3>Verification Email Sent</h3>
                </Typography>
                <Typography variant="p" wrap className="text-muted-foreground" asChild>
                  <p>
                    We&apos;ve sent a verification link to your email address.
                    Please check your inbox and click the link to complete the authentication process.
                  </p>
                </Typography>
              </div>
            )
          }
        </div>
      </main>
    </Hero>
  )
}
