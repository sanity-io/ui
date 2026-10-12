import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles/helpers'
import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'
import {BadgeTone} from '../../types/badge'
import {ElementType, Props} from '../../types/component'
import {Box, BoxOwnProps} from '../box/box'
import {Text} from '../text/text'
import {ResponsiveRadiusProps} from '../types'
import {badgeBaseStyle, badgeToneStyle} from './styles'
import {BadgeStyleProps} from './types'

/**
 * @public
 */
export interface BadgeOwnProps extends BoxOwnProps, ResponsiveRadiusProps {
  fontSize?: number | number[]
  /** @deprecated No longer used. */
  mode?: never
  tone?: BadgeTone
}

/**
 * @public
 */
export type BadgeProps<E extends ElementType = 'div'> = Props<BadgeOwnProps, E>

const BadgeBase = styled(Box)`
  ${badgeBaseStyle}
`

const StyledBadge = styled(BadgeBase)<BadgeStyleProps & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  badgeToneStyle,
)

const BadgeComponent = function Badge(
  props: BadgeOwnProps & {as?: ElementType} & React.HTMLProps<HTMLDivElement>,
) {
  const {
    children,
    fontSize = 1,
    padding = 1,
    radius = 'full',
    ref,
    tone = 'default',
    ...restProps
  } = props

  return (
    <StyledBadge
      data-ui="Badge"
      {...restProps}
      $tone={tone}
      $radius={_getArrayProp(radius)}
      padding={_getArrayProp(padding)}
      ref={ref}
    >
      <Text size={fontSize}>{children}</Text>
    </StyledBadge>
  )
}

/**
 * Badges are used to tag resources.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Badge = BadgeComponent as unknown as <E extends ElementType = 'div'>(
  props: BadgeProps<E>,
) => React.JSX.Element
