import {
  // a11yPlugin,
  defineConfig,
  perfPlugin,
} from '@sanity/ui-workshop'
import {scopes} from './scopes'

export const config = defineConfig({
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
  features: {
    // navbar: false,
  },
  frameUrl: '/frame/',
  plugins: [
    perfPlugin(),
    // a11yPlugin()
  ],
  scopes,
  title: 'Sanity UI',
})
