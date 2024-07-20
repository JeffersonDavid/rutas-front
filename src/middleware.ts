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

  console.log('pasaaaaaaaaaaaaaaaaaaaaaa')

  console.log(token)
  // Permitir el acceso a las rutas públicas sin autenticación
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirigir a /login si no hay token y la ruta no es pública ni raíz
  if (!token) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Validar el token con una petición a la API
    const validateTokenResponse = await fetchData('http://localhost/api/user-checking', { data: null }, token);

    // Si la respuesta no es 200, redirigir a /login
    if (validateTokenResponse.status !== 200) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirigir a /dashboard si el usuario está autenticado y trata de acceder a la raíz
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

  } catch (error) {
    // En caso de error en la validación, redirigir a /login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permitir el acceso a otras rutas si el token es válido
  return NextResponse.next();
}
