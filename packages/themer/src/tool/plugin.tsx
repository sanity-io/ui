import {definePlugin, type LayoutProps} from 'sanity'

import {CreateThemeOptions} from '../types'
import {ThemerActiveToolLayout} from './ThemerActiveToolLayout'
import {ThemerLayout} from './ThemerLayout'
import {ThemerNavbar} from './ThemerNavbar'

/**
 * Options for the {@link themerTool} plugin.
 *
 * @public
 */
export interface ThemerToolOptions {
  /**
   * The colors that the Studio's configured theme was generated from — the
   * themer starts editing from these, so pass the same object that the
   * `theme` in the Studio config uses:
   *
   * ```ts
   * const colors = {primary: '#2276fc'}
   *
   * export default defineConfig({
   *   theme: createTheme(colors),
   *   plugins: [themerTool({colors})],
   * })
   * ```
   */
  colors?: CreateThemeOptions
}

/**
 * A Studio plugin that adds a themer sidebar for generating Studio themes:
 * a navbar toggle opens the sidebar next to the active tool, where presets
 * and color pickers preview a `createTheme` theme live on the whole Studio
 * while you browse around. Toggle between light and dark mode with the
 * regular appearance menu — the preview follows it.
 *
 * ```ts
 * import {themerTool} from '@sanity/themer/tool'
 * import {defineConfig} from 'sanity'
 *
 * export default defineConfig({
 *   plugins: [themerTool()],
 *   // ...rest of the config
 * })
 * ```
 *
 * @public
 */
export const themerTool = definePlugin<ThemerToolOptions | void>((options) => {
  const baseColors: CreateThemeOptions = options?.colors ?? {}

  function ThemerLayoutWithOptions(props: LayoutProps) {
    return <ThemerLayout {...props} baseColors={baseColors} />
  }

  return {
    name: '@sanity/themer/tool',
    studio: {
      components: {
        layout: ThemerLayoutWithOptions,
        navbar: ThemerNavbar,
        activeToolLayout: ThemerActiveToolLayout,
      },
    },
  }
})
