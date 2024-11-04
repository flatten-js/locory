import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LayoutSidebar } from "./layout.sidebar"


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <main className="flex flex-col w-full h-screen">
        <div className="flex items-center p-4">
          <SidebarTrigger />
        </div>
        { children }
      </main>
    </SidebarProvider>
  )
}
