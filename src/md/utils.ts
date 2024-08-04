import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchData } from '../app/components/auth/dataCript';

export const PUBLIC_PATHS: string[] = ['/login', '/_next', '/static'];
export const LOGIN_URL = '/login';
export const DASHBOARD_URL = '/dashboard';
export const API_URL = 'http://localhost/api/user-checking';

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(path => pathname.startsWith(path));
}

export function getTokenFromCookies(req: NextRequest): string | undefined {
  return req.cookies.get('authToken')?.value;
}


export async function validateToken(token: string): Promise<boolean> {

    try {
      const response = await fetchData(API_URL, { data: null }, token);
      return response.status === 200;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  