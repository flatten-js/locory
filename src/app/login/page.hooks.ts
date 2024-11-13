'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { z } from "zod"

import { env } from "@/env"


export const State = {
  INITIAL: 0,
  EMAIL_PROCESSING: 1,
  EMAIL_SUCCESS: 2,
  VERIFY_PROCESSING: 3,
  VERIFY_SUCCESS: 4,
  VERIFY_ERROR: 5
} as const

export type States = typeof State[keyof typeof State]

const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  })
})

const verifySchema = z.object({
  token: z.string().min(6, {
    message: "Please enter a valid verification code."
  })
})

type EmailSchema = typeof emailSchema
type VerifySchema = typeof verifySchema

export function usePage() {
  const router = useRouter()
  const [state, setState] = useState<States>(State.INITIAL)

  const emailForm = useForm<z.infer<EmailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });

  const verifyForm = useForm<z.infer<VerifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { token: '' }
  });

  async function handleEmailSubmit(data: z.infer<EmailSchema>) {
    setState(State.EMAIL_PROCESSING)
    const result = await signIn("email", { email: data.email, callbackUrl: env.NEXT_PUBLIC_PROTECTED_ROOT_PATH, redirect: false });
    if (result?.error) {
      emailForm.setError("email", { message: "An unexpected error occurred. Please try again later." });
      setState(State.INITIAL)
    } else {
      setState(State.EMAIL_SUCCESS)
    }
  }

  async function handleVerifySubmit(data: z.infer<VerifySchema>) {
    setState(State.VERIFY_PROCESSING)

    const url = new URL('/api/auth/callback/email', window.location.origin);
    const searchParams = new URLSearchParams(window.location.search);
    const callbackUrl = searchParams.get('callbackUrl') ?? env.NEXT_PUBLIC_PROTECTED_ROOT_PATH;
    url.searchParams.append('callbackUrl', callbackUrl);
    url.searchParams.append('token', data.token);
    url.searchParams.append('email', emailForm.getValues().email);

    const response = await fetch(url);
    const error = new URL(response.url).searchParams.get('error');
    if (!error) {
      setState(State.VERIFY_SUCCESS)
      router.push(response.url)
    } else {
      setState(State.VERIFY_ERROR)
    }
  }

  return {
    state,
    emailForm,
    verifyForm,
    handleEmailSubmit,
    handleVerifySubmit
  }
}
