import {definePlugin, type LayoutProps} from 'sanity'

import {BuildThemeOptions, DEFAULT_ACCENT} from '../theme/options'
import {ThemerActiveToolLayout} from './ThemerActiveToolLayout'
import {ThemerLayout} from './ThemerLayout'
import {ThemerNavbar} from './ThemerNavbar'

/**
 * Options for the {@link themerTool} plugin.
 *
 * This is experimental and may change or be removed in any release without
 * notice — use at your own risk.
 *
 * @alpha
 */
export interface ThemerToolOptions {
  /**
   * The `buildTheme` options that the Studio's configured theme was generated
   * from — the themer starts editing from these, so pass the same object that
   * the `theme` in the Studio config uses:
   *
   * ```ts
   * const config: BuildThemeOptions = {accent: '#1cb485'}
   *
   * export default defineConfig({
   *   theme: buildTheme(config),
   *   plugins: [themerTool({config})],
   * })
   * ```
   */
  config?: BuildThemeOptions
}

/**
 * A Studio plugin that adds a themer sidebar for `buildTheme` themes: a
 * navbar toggle opens the sidebar next to the active tool, where presets, the
 * accent/text/background pickers and the contrast slider preview a
 * `buildTheme` theme live on the whole Studio while you browse around.
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
 * This is experimental and may change or be removed in any release without
 * notice — use at your own risk.
 *
 * @alpha
 */
export const themerTool = definePlugin<ThemerToolOptions | void>((options) => {
  const baseOptions = options?.config ?? {accent: DEFAULT_ACCENT}

  function ThemerLayoutWithOptions(props: LayoutProps) {
    return <ThemerLayout {...props} baseOptions={baseOptions} />
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
