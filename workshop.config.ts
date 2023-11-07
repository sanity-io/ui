import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

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
  plugins: [perfPlugin()],
  title: '@sanity/ui',
})
