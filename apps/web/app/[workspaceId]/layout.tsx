import { AppSidebar } from '@/components/app-sidebar'
import ModalManager from '@/components/modals/modal-manager'
import { PlatformBreadcrumb } from '@/components/platform-breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 w-full shrink-0 items-center gap-2 bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <PlatformBreadcrumb />
          </div>
        </header>

        <ModalManager />

        <main className="flex flex-1 flex-col gap-4 px-6 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
