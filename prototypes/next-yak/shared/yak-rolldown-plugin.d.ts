import type { Plugin } from 'rolldown';
export interface YakRolldownPluginOptions {
    /** Hash base for file paths, must be the same on every machine (defaults to the package root) */
    basePath?: string;
    /** Class/variable name prefix, see yak-prefix.ts */
    prefix?: string;
    /** Name of the emitted stylesheet, relative to the output dir */
    cssFileName?: string;
    minify?: boolean;
}
/**
 * Feasibility probe for `@sanity/ui`'s tsdown build: next-yak ships no rolldown/tsdown plugin
 * (only Vite, webpack, Turbopack and Rsbuild integrations), but the compiler is a plain SWC wasm
 * plugin and the cross-file resolver is exported, so a bundler integration is ~120 lines:
 *
 *  1. `transform`: run SWC with the yak wasm plugin on every module that imports `next-yak`.
 *     The plugin injects `import "virtual:yak-css:<relative path>.css"` and leaves the CSS in
 *     `/*YAK Extracted CSS:…*\/` comments; cross-file constants (`${vars.x}`) are left as
 *     `--yak-css-import: url(...)` placeholders that `resolveCrossFileConstant` fills in.
 *  2. `resolveId`/`load`: the virtual CSS import becomes an empty side-effect JS module, so the
 *     CSS stays attached to the chunk graph without relying on rolldown's own CSS pipeline.
 *  3. `generateBundle`: concatenate the CSS of every module in chunk order into one asset —
 *     the same shape `@sanity/vanilla-extract-rolldown-plugin` uses for `styles.css`.
 *
 * Not covered here (would be needed for production): lightningcss minification/lowering of the
 * emitted CSS, `inject`/nodeCompat `exports` wiring, watch-mode invalidation of `.yak.ts`
 * dependencies, source maps for the CSS, and per-file caching.
 */
export declare function yakRolldownPlugin(options?: YakRolldownPluginOptions): Plugin;
