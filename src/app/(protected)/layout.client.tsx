'use client'

import { Provider } from "react-redux"
import { type RouterOutputs } from "@/trpc/react"

import { SidebarProvider } from "@/components/ui/sidebar"

import { store } from "@/stores/store"


type LayoutClientProps = {
  user: RouterOutputs["user"]["getProfile"]
  children: React.ReactNode
}

export default function LayoutClient({ 
  user, 
  children 
}: LayoutClientProps) {
  return (
    <SidebarProvider>
      <Provider store={ store(user.name ?? '') }>
        { children }
      </Provider>
    </SidebarProvider>
  )
}