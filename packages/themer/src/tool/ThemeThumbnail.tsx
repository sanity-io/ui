import {Card} from '@sanity/ui'

import {BuildThemeOptions} from '../theme/options'
import {ThemePreview} from './ThemePreview'

/**
 * The floating preview card of a theme: the lo-fi studio mockup on a raised,
 * rounded card, like the appearance previews in macOS System Settings.
 *
 * @internal
 */
export function ThemeThumbnail(props: {options: BuildThemeOptions}) {
  return (
    <Card overflow="hidden" radius={3} shadow={1}>
      <ThemePreview options={props.options} />
    </Card>
  )
}
