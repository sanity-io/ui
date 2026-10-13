import {readFileSync} from 'node:fs'

import wyw from '@wyw-in-js/rollup'
import {defineConfig, type UserConfig} from 'tsdown'

/**
 * Library build: tsdown (rolldown) + the stock `@wyw-in-js/rollup` plugin.
 *
 * Flavors (env `WYW_FLAVOR`):
 * - `default`    — stock Linaria class names: `<letter><murmur(relative file:idx)>`
 * - `namespaced` — `classNameSlug` prefixes every class with `<package>-<version>-`
 * - `atomic`     — `@linaria/atomic`: one content-addressed class per declaration
 */
const flavor = process.env.WYW_FLAVOR ?? 'default'
const outDir = process.env.OUT_DIR ?? `dist/${flavor}`

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  name: string
  version: string
}
const pkgSlug = pkg.name.split('/').pop()!

// `@linaria/atomic` exports the same `css`, `cx` and `styled` names, so the
// atomic flavor only has to point the imports at it before wyw sees the code.
const rewriteToAtomic = {
  name: 'rewrite-linaria-imports-to-atomic',
  transform(code: string, id: string) {
    if (!/\.[jt]sx?$/.test(id) || id.includes('node_modules')) return null
    if (!code.includes('@linaria/')) return null
    return {code: code.replace(/from '@linaria\/(core|react)'/g, "from '@linaria/atomic'"), map: null}
  },
}

const config: UserConfig = defineConfig({
  entry: ['src/index.ts'],
  outDir,
  format: 'esm',
  platform: 'browser',
  dts: true,
  clean: true,
  sourcemap: false,
  external: [/^react($|\/)/, /^@linaria\//],
  plugins: [
    ...(flavor === 'atomic' ? [rewriteToAtomic] : []),
    wyw({
      // tsdown's dts pass routes virtual `*.d.ts` modules through `transform`;
      // without this, wyw tries to parse them ("Initializers are not allowed
      // in ambient contexts").
      exclude: [/\.d\.[cm]?ts$/, /node_modules/],
      sourceMap: false,
      prefixer: false,
      // The plugin's default (`true`) deadlocks intermittently under rolldown's
      // concurrent transform hooks (4 of 12 tsdown builds hung in this
      // prototype; 0 of 12 with `false`). Opt back in with WYW_SERIALIZE=true.
      serializeTransform: process.env.WYW_SERIALIZE === 'true',
      ...(flavor === 'namespaced'
        ? {classNameSlug: (hash: string) => `${pkgSlug}-${pkg.version}-${hash}`}
        : {}),
    }),
  ],
})

export default config
