'use client'

import ModalManager from '@/components/modals/modal-manager'
import DashboardHeader from '@/components/ui/dashboard-header'
import DashboardNavigation from '@/components/ui/dashboard-navigation'
import WorkspaceIdManager from '@/components/workspace-id-manager'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate flex flex-shrink-0 flex-col">
      <DashboardHeader />

      <DashboardNavigation />

      <ModalManager />

      <WorkspaceIdManager />

      <div className="flex flex-1">
        <main className="relative isolate w-full flex-1">
          <div
            className={cn(
              'mt-4 max-w-6xl gap-12 pb-20 max-sm:w-full max-sm:overflow-x-auto max-sm:px-3 sm:mx-auto',
              'sm:w-[calc(100%-theme(spacing.10))] lg:mt-10 lg:pb-10',
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
