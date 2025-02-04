import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronLeft,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Scan",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Scan In",
          url: "/admin/scan-in",
        },
        {
          title: "Scan Infor",
          url: "/admin/scan-infor",
        },
        {
          title: "Borrow/Return",
          url: "/admin/borrow-return-management",
        },
      ],
    },
    {
      title: "Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Material",
          url: "/admin/mtrl-management",
        },
        {
          title: "Loaction",
          url: "/admin/location-management",
        },
        {
          title: "Borrow/Return History",
          url: "/admin/borrow-return-history-management",
        },
        {
          title: "Print QR",
          url: "/admin/print-qr",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="mt-4 flex justify-center text-2xl font-bold relative group-data-[collapsible=icon]:hidden">
          <p className="">HS VINA</p>
          <ChevronLeft
            className="absolute top-0 right-0 h-8 w-8 bg-slate-200 dark:bg-gray-700 rounded-lg"
            onClick={() => toggleSidebar()}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
