import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import React, {CSSProperties, forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {Placement, Radius} from '../../types'
import {Arrow} from '../../utils'
import {Card, CardProps} from '../card'
import {
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
} from './constants'
import {tooltipCardStyle} from './tooltipCardStyles'

const StyledCard = /* @__PURE__ */ styled(Card)`
  ${tooltipCardStyle}
`

/**
 * @internal
 */
export interface TooltipCardProps {
  animate?: boolean
  arrow: boolean
  arrowRef: React.Ref<HTMLDivElement>
  arrowX?: number
  arrowY?: number
  originX?: number
  originY?: number
  padding?: number | number[]
  placement?: Placement
  radius?: Radius | Radius[]
  scheme?: ThemeColorSchemeKey
  shadow?: number | number[]
}

/**
 * Layout shared by the static `TooltipCard` and the motion-wrapped card in
 * `tooltipCardAnimated.tsx`. The root component (and its extra props) is injected, so the motion
 * variant can pass a `motion/react` component without this module depending on it.
 *
 * @internal
 */
export const TooltipCardLayout = forwardRef(function TooltipCardLayout(
  props: TooltipCardProps & {
    cardComponent?: React.ElementType
    cardProps?: Record<string, unknown>
  } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    animate,
    arrow,
    arrowRef,
    arrowX,
    arrowY,
    cardComponent: CardComponent = StyledCard,
    cardProps,
    children,
    originX,
    originY,
    padding,
    placement,
    radius,
    scheme,
    shadow,
    style,
    ...restProps
  } = props

  const rootStyle: CSSProperties = useMemo(
    () => ({
      originX,
      originY,
      willChange: animate ? 'transform' : undefined,
      ...style,
    }),
    [animate, originX, originY, style],
  )

  const arrowStyle: CSSProperties = useMemo(
    () => ({
      left: arrowX !== null ? arrowX : undefined,
      top: arrowY !== null ? arrowY : undefined,
      right: undefined,
      bottom: undefined,
    }),
    [arrowX, arrowY],
  )

  return (
    <CardComponent
      data-ui="Tooltip__card"
      {...(restProps as CardProps)}
      {...cardProps}
      data-placement={placement}
      padding={padding}
      radius={radius}
      ref={ref}
      scheme={scheme}
      shadow={shadow}
      style={rootStyle}
    >
      {children}

      {arrow && (
        <Arrow
          ref={arrowRef}
          style={arrowStyle}
          width={DEFAULT_TOOLTIP_ARROW_WIDTH}
          height={DEFAULT_TOOLTIP_ARROW_HEIGHT}
          radius={DEFAULT_TOOLTIP_ARROW_RADIUS}
        />
      )}
    </CardComponent>
  )
})
TooltipCardLayout.displayName = 'ForwardRef(TooltipCardLayout)'

/**
 * Static, motion-free tooltip card. Rendered synchronously when the tooltip is not animated, so
 * tooltip content mounts in the same commit that shows the tooltip.
 *
 * @internal
 */
export const TooltipCard = forwardRef(function TooltipCard(
  props: TooltipCardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <TooltipCardLayout {...props} ref={ref} />
})
TooltipCard.displayName = 'ForwardRef(TooltipCard)'
