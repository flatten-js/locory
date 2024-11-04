import { getServerAuthSession } from "@/server/auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LayoutSidebar } from "./layout.sidebar"


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <SidebarProvider>
      <LayoutSidebar user={session.user} />
      <main className="flex flex-col w-full h-screen">
        <div className="flex items-center p-4">
          <SidebarTrigger />
        </div>
        { children }
      </main>
    </SidebarProvider>
  )
}
