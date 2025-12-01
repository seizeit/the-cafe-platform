import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection for MVP
// Will be replaced with proper authentication later

export function middleware(request: NextRequest) {
  // Skip middleware for login page, auth endpoints, debug endpoint, and static assets
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/api/debug') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get('thecafe_auth')

  // Verify password (simple check for MVP)
  const mvpPassword = process.env.MVP_PASSWORD || 'thecafe2025'

  if (!authCookie || authCookie.value !== mvpPassword) {
    // Redirect to login if not authenticated or invalid password
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl, 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /login (login page)
     * - /_next (Next.js internals)
     * - /favicon.ico, /assets (static files)
     */
    '/((?!login|_next|favicon.ico|assets).*)',
  ],
}
