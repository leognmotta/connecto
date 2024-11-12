import { useOrganization, UserButton, useUser } from '@clerk/nextjs'
import { SlashIcon } from 'lucide-react'
import Link from 'next/link'

import OrganizationSwitcher from '../organization-switcher'
import Logo from './logo'

const DashboardHeader = () => {
  const { organization } = useOrganization()
  const { user } = useUser()

  return (
    <header className="bg-gray-100">
      <div className="flex items-center justify-between gap-3 overflow-x-auto border-b bg-gray-100 py-2 pl-2 pr-4 md:pl-3.5 md:pr-5">
        <div className="flex items-center gap-1">
          {/* Logo and Home Link */}
          <Link
            href={`${organization?.id ?? user?.id}`}
            className="after:border-blue relative mr-2 p-2 outline-none after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:size-9 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:opacity-0 focus-visible:after:opacity-100"
          >
            <Logo />
          </Link>

          {/* Organization Selector */}
          <div className="flex items-center gap-2">
            <OrganizationSwitcher />

            <div>
              <SlashIcon className="h-3 -rotate-[24deg] text-muted-foreground max-md:hidden" />
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3.5">
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
