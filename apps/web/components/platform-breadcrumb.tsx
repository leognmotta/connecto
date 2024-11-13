'use client'

import { useParams, usePathname } from 'next/navigation'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { usePlatformBasePath } from '@/hooks/use-platform-base-path'

export function PlatformBreadcrumb() {
  const pathname = usePathname()
  const basePath = usePlatformBasePath()
  const { workspaceId } = useParams<{ workspaceId: string }>()

  // Remove workspaceId from path and split remaining segments
  const segments = pathname
    .replace(`/${workspaceId}`, '')
    .split('/')
    .filter(Boolean)

  // Don't render breadcrumbs if we're on the home page
  if (segments.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={basePath}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === segments.length - 1 ? (
                  <BreadcrumbPage>
                    {segment
                      .split(/[-_]/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(' ')}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`${basePath}/${segments.slice(0, index + 1).join('/')}`}
                  >
                    {segment
                      .split(/[-_]/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(' ')}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </React.Fragment>
  )
}
