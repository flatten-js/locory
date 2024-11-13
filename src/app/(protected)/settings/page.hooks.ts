'use client'

import { useSearchParams, useRouter } from 'next/navigation'

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { useAppDispatch } from "@/stores/store"
import { setName } from "@/stores/user"
import { type RouterOutputs } from "@/trpc/react"

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" })
})

type schema = typeof schema

type UsePageProps = {
  user: RouterOutputs["user"]["getProfile"]
}

export function usePage({ user }: UsePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('t') ?? 'general'

  const dispatch = useAppDispatch()

  const changeProfile = api.user.changeProfile.useMutation();

  const form = useForm<z.infer<schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name ?? '' }
  });

  function handleTabChange(value: string) {
    router.push(`?t=${value}`)
  }

  async function handleSubmit(data: z.infer<typeof schema>) {
    try {
      await changeProfile.mutateAsync({ name: data.name })
      dispatch(setName(data.name))
      toast.success("Profile updated")
    } catch (e) {
      toast.error("Failed to update profile")
    }
  }

  return { form, handleSubmit, activeTab, handleTabChange }
}