import { NextResponse } from \'next/server\'
import type { NextRequest } from \'next/server\'
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  if (url.pathname.startsWith(\'/_next\') || url.pathname.startsWith(\'/login\') || url.pathname.includes(\'favicon\')) {
    return NextResponse.next()
  }
  const pwd = url.searchParams.get(\'pwd\')
  const cookie = request.cookies.get(\'nutri_auth\')?.value
  if (pwd === \'nutri2025\') {
    const res = NextResponse.redirect(new URL(\'/\', request.url))
    res.cookies.set(\'nutri_auth\', \'nutri2025\', { maxAge: 2592000, path: \'/\' })
    return res
  }
  if (cookie === \'nutri2025\') {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL(\'/login\', request.url))
}
export const config = { matcher: \'/:path*\' }
