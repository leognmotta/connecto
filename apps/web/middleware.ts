import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname
  const shouldProtect = !!pathname.match(
    /^\/(org_[a-zA-Z0-9]+|user_[a-zA-Z0-9]+)/,
  )

  // Check if path starts with /org_ or /user_ which indicates a workspace route
  if (shouldProtect) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
