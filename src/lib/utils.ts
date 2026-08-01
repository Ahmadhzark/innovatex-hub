/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Prefix a public asset path with the deployment basePath.
 * next/image and next/link handle this automatically, but raw <img> src,
 * fetch() calls, and GLB model URLs do not.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
