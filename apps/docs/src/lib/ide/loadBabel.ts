export type Babel = typeof import('@babel/standalone')

/**
 * Loads `@babel/standalone` on demand. The package is bundled with the app
 * (code-split into its own chunk, only fetched by the arcade frame) instead
 * of being loaded from a third-party CDN at runtime. This keeps the version
 * pinned through the lockfile, so an upgrade (e.g. the v7 -> v8 jump that
 * switched @babel/preset-react to the automatic runtime) is a reviewed
 * dependency bump instead of a silent change in transform output. See the
 * matching preset configuration in `evalComponent.ts`.
 */
export function loadBabel(): Promise<Babel> {
  return import('@babel/standalone')
}
