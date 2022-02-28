import {defineConfig, perfPlugin} from '@sanity/ui-workshop'
import {scopes} from './scopes'
import {app, basePath} from '$config'

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
