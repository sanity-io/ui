import path from 'path'
import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

// Workshop configuration
export default defineConfig({
  alias: _getAlias(),
  plugins: [perfPlugin()],
  title: '@sanity/ui-workshop',
})

function _getAlias() {
  if (typeof window !== 'undefined') return undefined

  return {
    '@sanity/ui-workshop/plugin-a11y': path.resolve(__dirname, 'exports/plugin-a11y'),
    '@sanity/ui-workshop/plugin-perf': path.resolve(__dirname, 'exports/plugin-perf'),
    '@sanity/ui-workshop': path.resolve(__dirname, 'exports'),

    // '@sanity/ui': path.resolve(__dirname, '../design/packages/@sanity/ui/src'),
  }
}
