import {defineConfig} from 'tsdown'

import {yakPrefixFor} from '../../shared/yak-prefix.ts'
import {yakRolldownPlugin} from '../../shared/yak-rolldown-plugin.ts'
import pkg from './package.json' with {type: 'json'}

/**
 * The same library built the way `@sanity/ui` is built (tsdown / rolldown), through the
 * feasibility plugin in `shared/yak-rolldown-plugin.ts`. Output: dist-tsdown/index.js,
 * dist-tsdown/index.d.ts and dist-tsdown/index.css.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist-tsdown',
  format: 'esm',
  platform: 'browser',
  dts: true,
  minify: false,
  external: ['react', 'react-dom', 'react/jsx-runtime', /^next-yak(\/|$)/],
  plugins: [
    yakRolldownPlugin({
      basePath: import.meta.dirname,
      prefix: yakPrefixFor(pkg.name, pkg.version),
      cssFileName: 'index.css',
    }),
  ],
})
