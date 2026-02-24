import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

import pkg from './package.json'

export default defineConfig({
  plugins: [perfPlugin()],
  title: pkg.name,
})
