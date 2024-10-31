import type {PaddingStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {_composeClassNames, badge} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {BadgeTone, ComponentType, Props} from '../../types'
import {Box} from '../box'
import {Text} from '../text'

/** @public */
export const DEFAULT_BADGE_ELEMENT = 'span'

/** @public */
export type BadgeOwnProps = PaddingStyleProps &
  RadiusStyleProps & {
    fontSize?: ResponsiveProp<FontTextSize>
    tone?: BadgeTone
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
) {
  const {
    as = DEFAULT_BADGE_ELEMENT,
    children,
    className,
    fontSize = 1,
    padding = 1,
    radius = 2,
    tone = 'default',
    ...rest
  } = props as BadgeProps<typeof DEFAULT_BADGE_ELEMENT>

  return (
    <Box
      data-ui="Badge"
      {...rest}
      as={as}
      className={_composeClassNames(
        className,
        badge({
          radius,
          tone,
        }),
      )}
      display="inline-flex"
      maxWidth="fill"
      padding={padding}
    >
      <Text size={fontSize}>{children}</Text>
    </Box>
  )
}

Badge.displayName = 'Badge'
