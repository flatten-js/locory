'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import type { Session } from "next-auth";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"


const schema = z.object({
  name: z.string().min(1, { message: "Name is required" })
})

type schema = typeof schema

type UsePageProps = {
  user: Session["user"]
}

export function usePage({ user }: UsePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('t') ?? 'general'

  const changeProfile = api.user.changeProfile.useMutation();

  const form = useForm<z.infer<schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name ?? '' }
  });

  function handleTabChange(value: string) {
    router.push(`?t=${value}`)
  }

  async function handleSubmit(data: z.infer<typeof schema>) {
    changeProfile.mutate(
      { name: data.name }, 
      { 
        onSuccess: () => toast.error("Profile updated"),
        onError: () => toast.error("Failed to update profile")
      }
    );
  }

  return { form, handleSubmit, activeTab, handleTabChange }
}