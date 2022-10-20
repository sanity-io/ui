import path from 'path'
import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

// Workshop configuration
export default defineConfig({
  alias: _getAlias(),
  plugins: [perfPlugin()],
  title: 'UI workshop',
})

function _getAlias() {
  if (typeof window !== 'undefined') return undefined

  return {
    '@sanity/ui-workshop/plugin-a11y': path.resolve(__dirname, 'src/plugin-a11y'),
    '@sanity/ui-workshop/plugin-perf': path.resolve(__dirname, 'src/plugin-perf'),
    '@sanity/ui-workshop': path.resolve(__dirname, 'src/core'),
  }
}
