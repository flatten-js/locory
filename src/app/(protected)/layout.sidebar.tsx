'use client'

import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"

import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const userData = {
  name: "Jane Doe",
  avatar: "/placeholder.svg?height=32&width=32"
}

type SidebarItem = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const OverviewItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  }
]

const AccountItems: SidebarItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  }
]

export function LayoutSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className="w-full flex items-center justify-start gap-4"
            >
              <Avatar>
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">{userData.name}</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                OverviewItems.map(item => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href} asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                AccountItems.map(item => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href} asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}