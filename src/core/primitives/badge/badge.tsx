import {forwardRef} from 'react'
import {styled} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {BadgeMode, BadgeTone} from '../../types'
import {Box, BoxProps} from '../box'
import {Text} from '../text'
import {ResponsiveRadiusProps} from '../types'
import {badgeStyle} from './styles'
import {BadgeStyleProps} from './types'

/**
 * @public
 */
export interface BadgeProps extends BoxProps, ResponsiveRadiusProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  /** @deprecated No longer used. */
  mode?: BadgeMode
  tone?: BadgeTone
}

const Root = styled(Box)<BadgeStyleProps & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  badgeStyle,
)

/**
 * Badges are used to tag resources.
 *
 * @public
 */
export const Badge = forwardRef(function Badge(
  props: BadgeProps & React.HTMLProps<HTMLDivElement>,
  ref,
) {
  const {
    children,
    fontSize = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mode: _deprecated_mode,
    padding = 1,
    radius = 'full',
    tone = 'default',
    ...restProps
  } = props

  return (
    <Root
      data-ui="Badge"
      {...restProps}
      $tone={tone}
      $radius={useArrayProp(radius)}
      padding={useArrayProp(padding)}
      ref={ref}
    >
      <Text size={fontSize}>{children}</Text>
    </Root>
  )
})
