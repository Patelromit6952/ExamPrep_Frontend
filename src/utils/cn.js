/**
 * Joins class names, skipping falsy values. Lightweight replacement for
 * the `clsx` package so we keep the dependency list minimal.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
