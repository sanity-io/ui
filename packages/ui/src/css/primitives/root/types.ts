import type {CardTone, ColorScheme} from '@sanity/ui/theme'

import type {HeightStyleProps} from '../../props/height/types'

/** @public */
export interface RootStyleProps extends HeightStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the color scheme of the root element and all of its descendants.
   *
   * @remarks
   * Controls whether the UI renders in light or dark mode. Child components
   * inherit this scheme unless explicitly overridden by a nested {@link Card}
   * with its own `scheme` prop.
   *
   * @defaultValue `"light"`
   */
  scheme?: ColorScheme

  /**
   * Sets the base color tone of the root element and all of its descendants.
   *
   * @remarks
   * Determines the background and foreground colors applied to the root.
   * Child components inherit this tone unless explicitly overridden by a
   * nested {@link Card} with its own `tone` prop.
   *
   * @defaultValue `"default"`
   */
  tone?: CardTone
}
