---
"@sanity/ui": patch
---

Remove the `displayName` assignments that followed every component definition. As top-level `Component.displayName = '…'` statements in the published dist they were side effects that pinned every component into consuming bundles, defeating tree-shaking of unused components (see [sanity-io/visual-editing#3535](https://github.com/sanity-io/visual-editing/pull/3535) for the kind of workaround this forced downstream). They were also redundant: every component is declared as a named function (e.g. `forwardRef(function Button(…) {…})`), so React DevTools derives the exact same name from `Function.name` — the build now passes `keepNames` so those function names survive into the dist.

If you profile or debug production builds with React DevTools and want component names to survive your own app's minification, configure the bundler to keep identifier names instead of relying on `displayName`, e.g. in Vite:

```ts
export default defineConfig({
  // Allows running React Profiler and better debugging
  resolve: {alias: {"react-dom/client": require.resolve("react-dom/profiling")}},
  build: {
    // Enable production source maps to easier debug deployed test studios
    sourcemap: true,
    rolldownOptions: {
      output: {
        // Disabling `mangle` (while keeping compression and whitespace removal) ensures that
        // the React DevTools components inspector has readable component names.
        // This overrides the `build.minify: 'oxc'` default set by `sanity build`, replacing
        // `esbuild: {minifyIdentifiers: false}` which the rolldown-powered Vite silently ignores.
        minify: {compress: true, mangle: false, codegen: true},
      },
    },
  },
})
```
