import { api } from "@/trpc/server"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import { LayoutSidebar } from "./layout.sidebar"
import LayoutClient from "./layout.client"


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await api.user.getProfile()

  return (
      <>
        <LayoutClient user={user}>
          <LayoutSidebar user={user} />
          <main className="flex flex-col w-full h-screen">
            <div className="flex items-center p-4">
              <SidebarTrigger />
            </div>
            { children }
          </main>
        </LayoutClient>
        <Toaster />
      </>
  )
}
