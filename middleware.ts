import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  if (req.url.includes('/_next/')) {
    return NextResponse.next();
  }

  if (req.url.includes('/login')) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken'); 
  if (sessionToken) {
    // TODO: validate with user
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', req.url); 
  return NextResponse.redirect(loginUrl);
}
