import {definePlugin, type LayoutProps} from 'sanity'

import {applyHues} from '../legacy/applyHues'
import {PartialHues} from '../legacy/types'
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
   * The hues that the Studio's configured theme was generated from — the
   * themer starts editing from these, so pass the same object that the
   * `theme` in the Studio config uses:
   *
   * ```ts
   * const hues = parseHuesFromUrl('https://themer.sanity.build/api/hues?preset=verdant')
   *
   * export default defineConfig({
   *   theme: createTheme(hues),
   *   plugins: [themerTool({hues})],
   * })
   * ```
   */
  hues?: PartialHues
}

/**
 * A Studio plugin that adds a themer sidebar for the legacy Themer themes:
 * a navbar toggle opens the sidebar next to the active tool, where presets,
 * per-hue editors and pasted themer.sanity.build URLs preview a legacy
 * `createTheme` theme live on the whole Studio while you browse around.
 * Toggle between light and dark mode with the regular appearance menu — the
 * preview follows it.
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
  const baseHues = applyHues(options?.hues ?? {})

  function ThemerLayoutWithOptions(props: LayoutProps) {
    return <ThemerLayout {...props} baseHues={baseHues} />
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
