import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale
});

export const config = {
  matcher: [
    "/",                // redirect root → /en or default
    "/(en|fr|de|yr)/:path*" // only handle valid locale routes
  ]
};
