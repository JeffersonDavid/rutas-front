import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchData } from './app/components/auth/dataCript';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define las rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/_next', '/static'];

  // Verificar si la ruta actual es una ruta pública
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Obtener el token de las cookies
  const token = req.cookies.get('authToken')?.value;

  // Permitir el acceso a las rutas públicas
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta no es pública, redirigir a /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  

  return NextResponse.next();
}
