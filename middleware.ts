import { NextResponse, type NextRequest } from 'next/server'

const PROJECT_REF = 'fdtazgmvncseakocqzgq'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/auth') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Check for Supabase session cookie (may be chunked: .0, .1, etc.)
  const hasSession = request.cookies.getAll().some(
    c => c.name.startsWith(`sb-${PROJECT_REF}-auth-token`)
  )

  if (!hasSession && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
