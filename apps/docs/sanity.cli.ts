import {createRequire} from 'node:module'
import path from 'node:path'

import {defineCliConfig} from 'sanity/cli'
import {mergeConfig, type Plugin, type UserConfig} from 'vite'

const require = createRequire(import.meta.url)

const reactDomDir = path.dirname(require.resolve('react-dom/package.json'))
const reactDomClientProduction = path.join(reactDomDir, 'cjs/react-dom-client.production.js')
const reactDomProfiling = path.join(reactDomDir, 'cjs/react-dom-profiling.profiling.js')

/**
 * With `deployment.autoUpdates`, Sanity builds `react-dom/client` as a vendor
 * entry that points at the absolute production CJS path — Vite `resolve.alias`
 * never sees the `react-dom/client` specifier. Redirect that entry (and any
 * other resolve of the production client) to the profiling build instead.
 */
function reactDomProfilingPlugin(): Plugin {
  return {
    name: 'sanity-ui-docs/react-dom-profiling',
    enforce: 'pre',
    resolveId(source) {
      if (source === reactDomClientProduction || source === 'react-dom/client') {
        return reactDomProfiling
      }
      return null
    },
  }
}

export default defineCliConfig({
  api: {
    projectId: 'mos42crl',
    dataset: 'production',
  },
  deployment: {
    appId: 'hamwtfu4n5tnwz05fq2fnrj1',
    autoUpdates: true,
  },
  project: {
    // `sanity build`/`sanity dev` don't read the basePath from
    // sanity.config.ts — without this, built asset URLs resolve from `/`
    // instead of /ui/studio/.
    basePath: '/ui/studio',
  },
  reactCompiler: {target: '19'},
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    enabled: true,
    overloadClientMethods: true,
    formatGeneratedCode: false,
  },
  vite(viteConfig, {command}): UserConfig {
    const nextConfig = mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@': './src',
        },
      },
    } satisfies UserConfig)

    // Enable React production profiling on the deployed docs studio so React
    // DevTools can profile with readable component names (see sanity-io/sanity#13674).
    if (command === 'build') {
      return mergeConfig(nextConfig, {
        plugins: [reactDomProfilingPlugin()],
        // Also alias the package specifier for any non-vendor resolution path
        resolve: {
          alias: {
            'react-dom/client': reactDomProfiling,
          },
        },
        build: {
          // Enable production source maps to easier debug the deployed studio
          sourcemap: true,
          rolldownOptions: {
            output: {
              // Disabling `mangle` (while keeping compression and whitespace removal)
              // ensures that the React DevTools components inspector has readable
              // component names. This overrides the `build.minify: 'oxc'` default set
              // by `sanity build`, replacing `esbuild: {minifyIdentifiers: false}`
              // which the rolldown-powered Vite silently ignores.
              minify: {compress: true, mangle: false, codegen: true},
            },
          },
        },
      } satisfies UserConfig)
    }

    return nextConfig
  },
})
