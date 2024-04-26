import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "cs"] as const;
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/login": "/login",
  "/register": "/register",
  "/auth/reset": "/auth/reset",
  "/[accountId]/dashboard": "/[accountId]/dashboard",
  "/[sessionId]/dashboard": "/[sessionId]/dashboard",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
