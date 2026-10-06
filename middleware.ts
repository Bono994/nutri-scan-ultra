import { NextResponse } from \'next/server\'
import type { NextRequest } from \'next/server\'
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  if (pathname.startsWith(\'/_next\') || pathname.startsWith(\'/api\') || pathname === \'/login\' || pathname.includes(\'.\')) {
    return NextResponse.next()
  }
  const pwd = req.nextUrl.searchParams.get(\'pwd\')
  if (pwd === \'nutri2025\') {
    const res = NextResponse.redirect(new URL(\'/\', req.url))
    res.cookies.set(\'nutri_auth\', \'nutri2025\', { path: \'/\', maxAge: 2592000 })
    return res
  }
  const cookie = req.cookies.get(\'nutri_auth\')?.value
  if (cookie === \'nutri2025\') {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL(\'/login\', req.url))
}
export const config = {
  matcher: [\'/((?!_next/static|_next/image|favicon.ico).*)\'],
}
