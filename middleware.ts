import { NextResponse } from \'next/server\'
import type { NextRequest } from \'next/server\'
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (path === \'/login\' || path.startsWith(\'/_next\') || path.includes(\'.\')) {
    return NextResponse.next()
  }
  const pwd = request.nextUrl.searchParams.get(\'pwd\')
  if (pwd === \'nutri2025\') {
    const res = NextResponse.next()
    res.cookies.set(\'nutri_auth\', \'nutri2025\', { path: \'/\', maxAge: 2592000 })
    return res
  }
  const cookie = request.cookies.get(\'nutri_auth\')?.value
  if (cookie === \'nutri2025\') {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL(\'/login\', request.url))
}
