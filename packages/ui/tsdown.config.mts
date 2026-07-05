import pluginBabel from '@rolldown/plugin-babel'
import {defineConfig} from '@sanity/tsdown-config'
import type {UserConfig} from 'tsdown'

const config: UserConfig = await defineConfig({
  entry: {
    'index': './exports/index.ts',
    'theme': './exports/theme.ts',
    '_visual-editing': './exports/_visual-editing.ts',
  },
  format: ['esm', 'cjs'],
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
})

config.plugins = [
  ...(Array.isArray(config.plugins) ? config.plugins : [config.plugins]),
  // The `reactCompiler` option in @sanity/tsdown-config cannot be used yet: it
  // loads the React Compiler preset from @vitejs/plugin-react@6, which
  // imports `vite/internal` and therefore requires vite 8, while vitest 4 and
  // Storybook keep this workspace on vite 7 (mixing vite majors splits
  // vitest's peer graph and breaks its snapshot runtime). Wire up
  // babel-plugin-react-compiler directly instead.
  pluginBabel({
    include: [/\.tsx$/],
    plugins: [['babel-plugin-react-compiler', {target: '18'}]],
  }),
]

export default config
