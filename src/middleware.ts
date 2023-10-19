import jwt_decode, { JwtPayload } from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LOGIN_ROUTE = "/auth/login";
const AUTH_ROUTES = [LOGIN_ROUTE, "/auth/signup"]

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get('token')?.value
    console.log("🚀 ~ file: middleware.ts:11 ~ middleware ~ token:", token)
    let isAuthenticated = false
    const absoluteURL = new URL(LOGIN_ROUTE, req.nextUrl.origin)
    const rootURL = new URL("/", req.nextUrl.origin)

    if (token) {
        try {
            const decodedToken: JwtPayload = jwt_decode(token)
            const isTokenExpired = decodedToken.exp && decodedToken.exp < Date.now() / 1000

            if (isTokenExpired) {
                return NextResponse.redirect(absoluteURL.toString())
            }
            isAuthenticated = true
        } catch (error) {
            return NextResponse.redirect(absoluteURL.toString())
        }
    }
    if (pathname.startsWith("/dashboard") && !isAuthenticated) {
        return NextResponse.redirect(absoluteURL.toString())
    }
    if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
        return NextResponse.redirect(rootURL.toString())
    }


    return NextResponse.next()

}