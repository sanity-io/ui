import {defineConfig} from '@sanity/ui-workshop'

export default defineConfig({
  alias: {
    '@sanity/icons': typeof __dirname !== 'undefined' ? __dirname + '/src' : '',
  },
  title: '@sanity/icons',
})
