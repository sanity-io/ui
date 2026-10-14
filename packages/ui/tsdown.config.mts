import {createNodeDriver} from '@pandacss/dev/node'
import {transformSource} from '@pandacss/transformer'
import {defineConfig} from '@sanity/tsdown-config'
import {mergeConfig, type Rolldown, type UserConfig} from 'tsdown'

const driver = await createNodeDriver({cwd: import.meta.dirname})
driver.codegen()

const VIRTUAL_CSS = '\0sanity-ui-panda.css'

const pandaPlugin: Rolldown.Plugin = {
  name: 'sanity-ui:panda-css',
  buildStart() {
    driver.parseFiles()
  },
  resolveId(id) {
    return id === VIRTUAL_CSS ? VIRTUAL_CSS : null
  },
  load(id) {
    if (id !== VIRTUAL_CSS) return null
    return driver.getLayerCss({layers: ['tokens', 'utilities'], emitLayerDeclaration: false}).css
  },
  transform: {
    filter: {
      id: {
        include: [/\.css\.ts$/],
        exclude: [/\.d\.[cm]?ts$/],
      },
    },
    handler(code, id) {
      driver.compiler.parseFileSource(id, code)
      const result = transformSource({
        compiler: driver.compiler,
        path: id,
        source: code,
        mode: 'build',
      })

      if (!result.changed || result.bailed) {
        throw new Error(`Panda could not statically transform ${id}`)
      }

      return {
        code: `import ${JSON.stringify(VIRTUAL_CSS)}\n${result.code}`,
        map: result.map ?? null,
      }
    },
  },
}

// The annotation keeps the declaration emit portable: this file is part of the
// same TypeScript program as the build (there is no separate tsconfig for
// dist), and the inferred config type cannot be named without it (TS2883).
const config: UserConfig = mergeConfig(
  await defineConfig({
    // One entry point per file in `src/exports/`. The glob form maps e.g.
    // `src/exports/toast.ts` → `@sanity/ui/toast` (the matched filename replaces
    // the `*` in the key, which is what drives the generated `package.json`
    // `exports` subpaths; `index.ts` maps to the root `.` export). Adding a file
    // to `src/exports/` is all it takes to publish a new subpath. Components
    // with heavy dependencies (motion, @floating-ui/react-dom, react-refractor)
    // live on their own subpaths so that importing the root entry never
    // references those dependencies, regardless of bundler treeshaking.
    entry: {
      '*': './src/exports/*.{ts,tsx}',
    },
    tsconfig: 'tsconfig.dist.json',
    styledComponents: true,
    // `transform: 'oxc'` runs the React Compiler natively via `oxc-transform-react`
    // (the Rust port) instead of `babel-plugin-react-compiler`
    reactCompiler: {target: '19', transform: 'oxc'},
    // `@sanity/tsdown-config` wires `cssNodeCompatPlugin` and resolves the
    // `@sanity/browserslist-config` lowering targets when `css` is configured.
    // `@tsdown/css` collects the virtual Panda stylesheet imported by each
    // transformed `.css.ts` module and emits `dist/styles.css` + the conditional
    // `./styles.css` export (`browser`/`style` → `dist/styles.css`,
    // `node`/`default` → `dist/styles-css.js`).
    css: {
      fileName: 'styles.css',
      inject: false,
      exports: {nodeCompat: true},
      minify: false,
    },
  }),
  // `@sanity/tsdown-config` builds its own plugin list and ignores a `plugins` option.
  {plugins: [pandaPlugin]},
)

export default config
