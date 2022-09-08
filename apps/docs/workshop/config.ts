import {defineConfig, perfPlugin} from '@sanity/ui-workshop'
import {app, basePath} from '../config'
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
    navbar: false,
  },
  frameUrl: `${basePath}/workshop/frame/`,
  plugins: [perfPlugin()],
  scopes,
  title: app.siteName,
})
