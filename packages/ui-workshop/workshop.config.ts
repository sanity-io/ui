import {defineConfig} from '@sanity/ui-workshop'
import {a11yPlugin} from '@sanity/ui-workshop/plugin-a11y'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

import pkg from './package.json'

export default defineConfig({
  plugins: [a11yPlugin(), perfPlugin()],
  title: pkg.name,
})
