import { createNavigation } from 'next-intl/navigation';

export const routing = {
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en' as const,
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
