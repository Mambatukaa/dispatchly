"use client"

import * as React from "react"
import {
  IconBuildingWarehouse,
  IconDashboard,
  IconTruck,
  IconUsers,
  IconFiles,
  IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"

const data = {
  user: {
    name: "Dispatcher",
    email: "dispatcher@dispatchly.app",
    avatar: "/avatars/dispatcher.jpg", // placeholder
  },

  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Loads", url: "/loads", icon: IconTruck },
    { title: "Drivers", url: "/drivers", icon: IconUsers },
    { title: "Documents", url: "/documents", icon: IconFiles },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: IconSettings },
  ]
}

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Brand */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconBuildingWarehouse className="!size-5" />
                <span className="text-base font-semibold">Dispatchly</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* User (auth-ready) */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
