import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {transform} from 'oxc-transform-react'
import type {Plugin} from 'vite'
import {defineConfig} from 'vitest/config'

/**
 * Runs the source under test through the React Compiler the way the package build does
 * (`tsdown.config.mts`: `oxc-transform-react`, React 19 target). The compiler changes what a
 * component evaluates during render — for example which values it reads to decide whether a
 * memoized callback is stale — so tests that pin that behavior run in the `react-compiler`
 * project below, in addition to the plain source run.
 */
function reactCompiler(): Plugin {
  return {
    name: 'sanity-ui:react-compiler',
    enforce: 'pre',
    transform: {
      filter: {id: {include: /\.[jt]sx?$/, exclude: [/\/node_modules\//, /\.css\.ts$/]}},
      async handler(code, id) {
        const result = await transform(id, code, {
          jsx: {runtime: 'automatic', development: true},
          reactCompiler: {target: '19'},
          sourcemap: true,
        })

        if (result.fatal) {
          this.error(result.errors.map((error) => error.message).join('\n\n'))
        }

        return {code: result.code, map: result.map}
      },
    },
  }
}

// Compiles the vanilla-extract `.css.ts` modules imported by the source under test (vitest
// stubs the resulting virtual CSS, but the class name exports must evaluate)
const plugins = () => [vanillaExtractPlugin()]

export default defineConfig({
  resolve: {
    // Keep every `from 'vitest'` (setup files, jest-dom, vitest-axe) on this
    // package's copy. pnpm isolates the same vitest version per vite peer set.
    dedupe: ['vitest'],
  },
  test: {
    coverage: {
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.css.ts'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: 'coverage',
      thresholds: {
        branches: 41,
        functions: 56,
        lines: 52,
        statements: 50,
      },
    },
    experimental: {
      // Print the slowest imports after test runs, to keep the cost of heavy
      // import graphs (e.g. barrel files) visible in CI and local runs.
      importDurations: {
        limit: 10,
        print: true,
      },
    },
    setupFiles: ['./test/setup.ts'],
    projects: [
      {
        extends: true,
        plugins: plugins(),
        test: {
          name: 'default',
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [...plugins(), reactCompiler()],
        test: {
          name: 'react-compiler',
          // Tests whose contract is only observable in compiled output
          include: ['src/core/primitives/tooltip/tooltip.maxWidth.test.tsx'],
        },
      },
    ],
  },
})
