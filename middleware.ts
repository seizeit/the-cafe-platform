import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password protection for MVP
// Will be replaced with proper authentication later

export function middleware(request: NextRequest) {
  // Skip middleware for login page and static assets
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get('thecafe_auth')

  if (!authCookie) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify password (simple check for MVP)
  const mvpPassword = process.env.MVP_PASSWORD || 'thecafe2025'

  if (authCookie.value !== mvpPassword) {
    // Invalid password, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
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
