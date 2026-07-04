import pluginBabel from '@rolldown/plugin-babel'
import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const entry = {
  'index': './exports/index.ts',
  'theme': './exports/theme.ts',
  '_visual-editing': './exports/_visual-editing.ts',
}

const config = await defineConfig({
  entry,
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
})

// Emit sourcemaps for both formats, like @sanity/pkg-utils did
config.sourcemap = true

const userConfig: UserConfig = {
  ...config,
  exports: {
    ...(typeof config.exports === 'object' ? config.exports : {}),
    customExports(exportsMap: Record<string, unknown>, context: {isPublish: boolean}) {
      for (const [subpath, sourceFile] of Object.entries(entry)) {
        const key = subpath === 'index' ? '.' : `./${subpath}`
        const value = exportsMap[key]
        if (context.isPublish) {
          // Publish the exact same exports shape as @sanity/pkg-utils did:
          // the `source` condition (the npm package ships `src` and `exports`,
          // and Sanity tooling resolves published packages to source through
          // it) and a trailing `default` fallback to the CJS build.
          if (typeof value === 'object' && value !== null) {
            exportsMap[key] = {source: sourceFile, ...value, default: `./dist/${subpath}.js`}
          }
        } else {
          // Dev exports: everything in the monorepo (tsc, oxlint, jest, vite)
          // resolves to TypeScript source, except Node processes (the `node`
          // condition), which cannot load .tsx source — the
          // @sanity/ui-workshop CLI imports `@sanity/ui` at startup and gets
          // the built output instead.
          exportsMap[key] = {
            node: {import: `./dist/${subpath}.mjs`, require: `./dist/${subpath}.js`},
            default: sourceFile,
          }
        }
      }
      return exportsMap
    },
  },
  plugins: [
    ...(Array.isArray(config.plugins) ? config.plugins : [config.plugins]),
    // The `reactCompiler` option in @sanity/tsdown-config currently cannot be
    // used: it loads the React Compiler preset from @vitejs/plugin-react@6,
    // which imports `vite/internal` and therefore requires vite 8, while this
    // repo is on vite 7 (Storybook 8). Wire up babel-plugin-react-compiler
    // directly instead.
    pluginBabel({
      include: [/\.tsx$/],
      plugins: [['babel-plugin-react-compiler', {target: '18'}]],
    }),
  ],
}

export default userConfig
