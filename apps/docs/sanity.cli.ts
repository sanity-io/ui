import {createRequire} from 'node:module'
import {defineCliConfig} from 'sanity/cli'
import {mergeConfig, type UserConfig} from 'vite'

const require = createRequire(import.meta.url)

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
        // Aliasing to react-dom/profiling is necessary in the production build,
        // otherwise React can't run the profiler on the deployed studio
        resolve: {alias: {'react-dom/client': require.resolve('react-dom/profiling')}},
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
