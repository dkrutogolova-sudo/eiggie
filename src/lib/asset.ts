/**
 * Prefix root-absolute asset paths with the deploy base path.
 *
 * GitHub Pages serves a project repo under /<repo>/ (e.g. /eiggie/), so raw
 * "/work/x.jpg" strings would 404. next/font, next/link and next.config's
 * basePath handle their own prefixing; this covers the plain <img>/<video>/<meta>
 * srcs we write by hand. Set NEXT_PUBLIC_BASE_PATH="/eiggie" in the build; clear
 * it (root) once a custom domain is attached.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;
