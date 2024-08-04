// middleware.ts
import { NextRequest,NextResponse } from 'next/server';
import { getTokenFromCookies, 
  isPublicPath,
  handleProtectedPath,
  handlePublicPath,
  DASHBOARD_URL
} from './md/utils';


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getTokenFromCookies(req);

  if (isPublicPath(pathname)) {
    return await handlePublicPath(pathname, token, req);
  }

  const response = await handleProtectedPath(token, req);
  if (pathname === '/') {
    return NextResponse.redirect(new URL(DASHBOARD_URL, req.url));
  }

  return response;
}
