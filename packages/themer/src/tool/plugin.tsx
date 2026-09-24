import {definePlugin, type LayoutProps} from 'sanity'

import {BuildThemeOptions} from '../theme/options'
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
   * const config: BuildThemeOptions = {light: {accent: '#1cb485'}, dark: {accent: '#22fca8'}}
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
 * navbar toggle opens the sidebar next to the Studio, with a list of themes —
 * the configured theme, the presets and your own — each previewed as a tiny
 * Studio in both color schemes. Picking one applies it live to the whole
 * Studio while you browse around; your own themes can be edited with
 * accent/text/background pickers and a contrast slider per scheme, added,
 * duplicated, given the colors of an image (its palette is read on device),
 * removed and restored, and a dialog shows the `buildTheme` snippet that
 * makes the applied theme permanent. Toggle between light and dark mode with
 * the regular appearance menu — the preview follows it — or split the
 * preview to see the whole Studio in light and dark side by side.
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
  // No options generate the stock theme, which is what a Studio without a
  // `theme` in its config gets
  const baseOptions = options?.config ?? {}

  function ThemerLayoutWithOptions(props: LayoutProps) {
    return <ThemerLayout {...props} baseOptions={baseOptions} />
  }

  return {
    name: '@sanity/themer/tool',
    studio: {
      components: {
        layout: ThemerLayoutWithOptions,
        navbar: ThemerNavbar,
      },
    },
  }
})
