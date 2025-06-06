import type {PaddingStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {badge} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types/props'
import {Box} from '../box/box'
import {Text} from '../text/text'
import type {BadgeTone} from './types'

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
      className={badge({className, tone})}
      display="flex"
      maxWidth="fill"
      padding={padding}
      radius={radius}
      width="min"
    >
      <Text size={fontSize}>{children}</Text>
    </Box>
  )
}
