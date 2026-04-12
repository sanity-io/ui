import {
  badge,
  BADGE_STYLE_PROP_KEYS,
  type BadgeStyleProps,
  type ResponsiveProp,
} from '@sanity/ui-css'
import type {FontTextSize} from '@sanity/ui-tokens'

import {_splitKeys} from '../../core/_keys'
import type {ComponentType, Props} from '../../core/types'
import {Text} from '../text/Text'

/** @public */
export const DEFAULT_BADGE_ELEMENT = 'span'

/** @public */
export interface BadgeOwnProps extends BadgeStyleProps {
  fontSize?: ResponsiveProp<FontTextSize>
}

/** @public */
export type BadgeElementType = 'div' | 'span' | ComponentType

/** @public */
export type BadgeProps<E extends BadgeElementType = BadgeElementType> = Props<BadgeOwnProps, E>

/**
 * Badges are used to tag resources.
 *
 * @public
 */
export function Badge<E extends BadgeElementType = typeof DEFAULT_BADGE_ELEMENT>(
  props: BadgeProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_BADGE_ELEMENT,
      children,
      fontSize = 1,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as BadgeProps<typeof DEFAULT_BADGE_ELEMENT>, BADGE_STYLE_PROP_KEYS)

  return (
    <Element data-ui="Badge" {...domProps} className={badge(styleProps)}>
      <Text as="span" size={fontSize}>
        {children}
      </Text>
    </Element>
  )
}
