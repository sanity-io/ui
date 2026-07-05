import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {BadgeMode, BadgeTone, ElementType, Props} from '../../types'
import {Box, BoxOwnProps} from '../box'
import {Text} from '../text'
import {ResponsiveRadiusProps} from '../types'
import {badgeStyle} from './styles'
import {BadgeStyleProps} from './types'

/**
 * @public
 */
export interface BadgeOwnProps extends BoxOwnProps, ResponsiveRadiusProps {
  fontSize?: number | number[]
  /** @deprecated No longer used. */
  // oxlint-disable-next-line no-deprecated
  mode?: BadgeMode
  tone?: BadgeTone
}

/**
 * @public
 */
export type BadgeProps<E extends ElementType = 'div'> = Props<BadgeOwnProps, E>

const StyledBadge = styled(Box)<BadgeStyleProps & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  badgeStyle,
)

const BadgeComponent = forwardRef(function Badge(
  props: BadgeOwnProps & {as?: ElementType} & React.HTMLProps<HTMLDivElement>,
  ref,
) {
  const {
    children,
    fontSize = 1,
    // oxlint-disable-next-line no-deprecated
    mode: _deprecated_mode,
    padding = 1,
    radius = 'full',
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
})
BadgeComponent.displayName = 'ForwardRef(Badge)'

/**
 * Badges are used to tag resources.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Badge = BadgeComponent as unknown as <E extends ElementType = 'div'>(
  props: BadgeProps<E>,
) => React.JSX.Element
