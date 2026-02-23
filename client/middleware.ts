import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value || request.headers.get('authorization')?.replace('Bearer ', '')
  const pathname = request.nextUrl.pathname

  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))

  // If no token and trying to access protected route, redirect to login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If has token and on auth route, redirect to home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
