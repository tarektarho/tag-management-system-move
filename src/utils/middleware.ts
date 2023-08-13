import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "../i18n.config"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

/**
 * Get the preferred locale based on the request's language preferences.
 * @param {NextRequest} request - The Next.js request object.
 * @returns {string | undefined} The preferred locale or undefined.
 */
export const getLocale = (request: NextRequest): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {}
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

/**
 * Calculate the new pathname with the specified locale.
 * @param {string} locale - The target locale.
 * @param {string} pathname - The original pathname.
 * @returns {string} The new calculated pathname.
 */
export const calculateNewPathname = (locale: string, pathname: string): string => {
  const newPathname = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`
  return newPathname
}

/**
 * Handle redirection when locale is missing in the pathname.
 * @param {URL} url - The URL object containing the pathname.
 * @param {NextRequest} request - The Next.js request object.
 * @returns {NextResponse} The redirection response.
 */
const handleMissingLocaleRedirect = (url: URL, request: NextRequest): NextResponse => {
  const { pathname } = url
  const locale = getLocale(request)
  // @ts-ignore locales are readonly
  const newPathname = calculateNewPathname(locale, pathname)
  const newUrl = new URL(newPathname, request.url)

  return NextResponse.redirect(newUrl)
}

/**
 * Middleware to handle missing locale redirection.
 * @param {NextRequest} request - The Next.js request object.
 */
export const middleware = (request: NextRequest) => {
  const { nextUrl } = request
  const { pathname } = nextUrl
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    handleMissingLocaleRedirect(nextUrl, request) // Pass both URL and request
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
