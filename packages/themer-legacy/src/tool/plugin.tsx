import {definePlugin} from 'sanity'

import {ThemerLayout} from './ThemerLayout'
import {ThemerNavbar} from './ThemerNavbar'

/**
 * A Studio plugin that brings the hosted Themer service (themer.sanity.build)
 * into your own Studio: a navbar toggle opens a sidebar with its presets and
 * the six hue editors, and the resulting `createTheme` theme previews live on
 * the whole Studio while you browse around — in the appearance the Studio is
 * set to, or in light and dark side by side.
 *
 * ```ts
 * import {themerTool} from '@sanity/themer-legacy/tool'
 * import {defineConfig} from 'sanity'
 *
 * export default defineConfig({
 *   plugins: [themerTool()],
 *   // ...rest of the config
 * })
 * ```
 *
 * The plugin is named `themer-legacy` so it can run next to `themerTool` from
 * `@sanity/themer/tool`, which edits the current `buildTheme` themes instead.
 *
 * @public
 */
export const themerTool = definePlugin(() => ({
  name: 'themer-legacy',
  studio: {
    components: {
      layout: ThemerLayout,
      navbar: ThemerNavbar,
    },
  },
}))
