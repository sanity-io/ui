/**
 * `@sanity/tsdown-config` types its `reactCompiler` option as a discriminated
 * union over the option typings of both compiler implementations:
 * `PluginOptions` from `babel-plugin-react-compiler` (the `transform: 'babel'`
 * branch) and `ReactCompilerOptions` from `oxc-transform-react` (the
 * `transform: 'oxc'` branch) — both optional peer dependencies whose typings
 * only resolve once installed.
 *
 * This repo only installs `oxc-transform-react` (every build uses
 * `transform: 'oxc'`). Without this stub the unresolved
 * `babel-plugin-react-compiler` import degrades to `any`, which collapses the
 * union and makes TypeScript resolve `defineConfig()` to the wrong overload
 * (the `reactServer: true` dual-build shape returning `UserConfig[]`). An
 * empty `PluginOptions` keeps the (never used) babel branch a real type so the
 * union keeps discriminating on `transform`.
 */
declare module 'babel-plugin-react-compiler' {
  export interface PluginOptions {}
}
