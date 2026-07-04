import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'
import {registerLanguage} from 'react-refractor'
import javascript from 'refractor/javascript'
import json from 'refractor/json'
import jsx from 'refractor/jsx'
import typescript from 'refractor/typescript'

// Import the theme source relatively: this config runs in Node (the workshop
// CLI), which cannot load the TypeScript source that the dev `exports` of
// `@sanity/ui/theme` point at.
import {buildTheme} from './src/theme'
import {fontsPlugin} from './workshop/fontsPlugin'

registerLanguage(javascript)
registerLanguage(json)
registerLanguage(jsx)
registerLanguage(typescript)

export default defineConfig({
  collections: [
    {
      name: 'components',
      title: 'Components',
    },
    {
      name: 'hooks',
      title: 'Hooks',
    },
    {
      name: 'primitives',
      title: 'Primitives',
    },
    {
      name: 'utils',
      title: 'Utils',
    },
  ],
  plugins: [fontsPlugin(), perfPlugin()],
  theme: buildTheme(),
  title: '@sanity/ui',
})
