import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi = pathname.startsWith('/api/advisors')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  // cookieで認証チェック
  const authCookie = request.cookies.get('admin_auth')
  const isAuthenticated = authCookie?.value === process.env.ADMIN_SECRET

  if (!isAuthenticated) {
    if (isAdminApi) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/advisors/:path*'],
}
