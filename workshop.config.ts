import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

export default defineConfig({
  alias: {
    '@sanity/ui': typeof __dirname !== 'undefined' ? __dirname + '/src' : '',
  },
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
