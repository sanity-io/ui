import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

export default defineConfig({
  plugins: [perfPlugin()],
  title: '@sanity/ui-workshop',
})
