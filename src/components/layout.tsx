import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { ArrowUp } from "lucide-react";

const Layout = () => {
  const handleClickScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Thêm hiệu ứng smooth scroll
    });
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset
          className="max-w-full md:max-w-[calc(100vw-var(--sidebar-width)-10px)] 
          md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-w-[calc(100vw-var(--sidebar-width-icon)-10px)]"
        >
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-2">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex flex-grow justify-between items-center">
                <p className="flex-grow text-center">HS VINA</p>
                <ModeToggle />
              </div>
            </div>
          </header>
          <div className="">
            <Outlet />

            <div className="fixed bottom-2 right-2 w-12 h-12 bg-sky-400 rounded-full flex justify-center items-center"
            onClick={handleClickScrollUp}
            >
              <ArrowUp />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Layout;
