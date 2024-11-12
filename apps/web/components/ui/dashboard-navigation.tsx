import { useOrganization } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const nav = [
  {
    label: 'Overview',
    path: '',
  },
  {
    label: 'Workflows',
    path: 'workflows',
  },
  {
    label: 'Credentials',
    path: 'credentials',
  },
  {
    label: 'Apps',
    path: 'apps',
  },
] as const

const DashboardNavigation = () => {
  const [renderBottom, setRenderBottom] = useState(false)
  const { organization } = useOrganization()
  const pathname = usePathname()

  const activeRoute =
    nav.find(
      (route) => route.path.length > 0 && pathname.includes(route.path),
    ) || nav[0]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 61 && !renderBottom) {
        setRenderBottom(true)
      } else if (window.scrollY <= 61 && renderBottom) {
        setRenderBottom(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [renderBottom])

  return (
    <div className="sticky top-0 z-10 border-transparent bg-background before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gray-300 before:opacity-0">
      <div className="absolute inset-x-0 -top-0.5 h-px"></div>
      <div
        className={cn(
          'no-scrollbar relative -top-px flex justify-between overflow-x-auto px-4 md:px-5',
          {
            'border-b': renderBottom,
          },
        )}
      >
        <nav className="relative isolate -ml-3.5 flex shrink-0">
          <div className="absolute inset-y-0 left-0"></div>
          {nav.map((nav) => {
            const isActive = activeRoute.path === nav.path

            return (
              <Link
                key={nav.label}
                href={`/${organization?.id}/${nav.path}`}
                className={cn(
                  'relative shrink-0 p-3.5 text-foreground transition hover:text-foreground focus-visible:after:opacity-100',
                  'after:absolute after:-inset-x-0.5 after:inset-y-2 after:rounded-lg after:border-2 after:border-blue-500 after:opacity-0',
                  {
                    'text-muted-foreground/80': !isActive,
                  },
                )}
              >
                {nav.label}
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className={cn('absolute inset-x-3.5 h-px bg-gray-950', {
                      'bottom-0': renderBottom,
                      'top-0': !renderBottom,
                    })}
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  ></motion.div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 opacity-0 transition-opacity duration-200"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 opacity-0 transition-opacity duration-200"></div>
    </div>
  )
}

export default DashboardNavigation
