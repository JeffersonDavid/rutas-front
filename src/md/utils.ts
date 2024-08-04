import { fetchData } from '../app/components/auth/dataCript';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const PUBLIC_PATHS: string[] = ['/login', '/_next', '/static'];
export const LOGIN_URL = '/login';
export const DASHBOARD_URL = '/dashboard';
export const API_URL = 'http://localhost/api/user-checking';

export async function handlePublicPath(pathname: string, token: string, req: NextRequest) {
  if (pathname === LOGIN_URL && token) {
    const isValidToken = await validateToken(token);
    if (isValidToken) {
      return NextResponse.redirect(new URL(DASHBOARD_URL, req.url));
    }
  }
  return NextResponse.next();
}

export async function handleProtectedPath(token: string, req: NextRequest) {
  if (!token) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }

  const isValidToken = await validateToken(token);
  if (!isValidToken) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url));
  }

  return NextResponse.next();
}

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(path => pathname.startsWith(path));
}

export function getTokenFromCookies(req: NextRequest) : string {
  return req.cookies.get('authToken')?.value || '';
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetchData( API_URL , { data: null }, token);
    return response.status === 200;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}
