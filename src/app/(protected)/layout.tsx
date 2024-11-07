import { api } from "@/trpc/server"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import { LayoutSidebar } from "./layout.sidebar"


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await api.user.getProfile()

  return (
    <SidebarProvider>
      <LayoutSidebar user={user} />
      <main className="flex flex-col w-full h-screen">
        <div className="flex items-center p-4">
          <SidebarTrigger />
        </div>
        { children }
      </main>
      <Toaster />
    </SidebarProvider>
  )
}
