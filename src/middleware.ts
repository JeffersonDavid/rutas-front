import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken, getTokenFromCookies , isPublicPath , LOGIN_URL, DASHBOARD_URL } from './md/utils';


export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;
  const token = getTokenFromCookies(req);
  console.log('token from middlleware')
  console.log(token)

  if (isPublicPath(pathname)) {
    
       console.log('entra isPublicPath')
    if (pathname === LOGIN_URL && token) {

      console.log('cumple pathname === LOGIN_URL && token')
      
      const isValidToken :boolean = await validateToken(token);

      console.log('isValidToken??')
      console.log(isValidToken)

      if (isValidToken) {
        return NextResponse.redirect(new URL(DASHBOARD_URL, req.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }

  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(DASHBOARD_URL, req.url));
  }

  return NextResponse.next();
}
