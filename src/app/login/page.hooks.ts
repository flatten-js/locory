'use client'

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { z } from "zod"

import { env } from "@/env"


export const State = {
  INITIAL: 0,
  PROCESSING: 1,
  SUCCESS: 2
} as const

export type States = typeof State[keyof typeof State]

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  })
})

type schema = typeof schema

export function usePage() {
  const [state, setState] = useState<States>(State.INITIAL)

  const form = useForm<z.infer<schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' }
  });

  async function handleSubmit(data: z.infer<typeof schema>) {
    setState(State.PROCESSING)
    const result = await signIn("email", { email: data.email, callbackUrl: env.NEXT_PUBLIC_PROTECTED_ROOT_PATH, redirect: false });
    if (result?.error) {
      form.setError("email", { message: "An unexpected error occurred. Please try again later." });
      setState(State.INITIAL)
    } else {
      setState(State.SUCCESS)
    }
  }

  return {
    state,
    form,
    handleSubmit
  }
}
