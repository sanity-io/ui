import {Strategy} from '@floating-ui/react-dom'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import React, {CSSProperties, forwardRef, useMemo} from 'react'
import {styled} from 'styled-components'

import {BoxOverflow, CardTone, Placement, PopoverMargins, Radius} from '../../types'
import {Arrow, useLayer} from '../../utils'
import {Card, CardProps} from '../card'
import {Flex} from '../flex'
import {
  DEFAULT_POPOVER_ARROW_HEIGHT,
  DEFAULT_POPOVER_ARROW_RADIUS,
  DEFAULT_POPOVER_ARROW_WIDTH,
  DEFAULT_POPOVER_MARGINS,
} from './constants'
import {popoverCardStyle, popoverWrapperStyle} from './popoverCardStyles'

const StyledCard = /* @__PURE__ */ styled(Card)`
  ${popoverCardStyle}
`

const StyledFlex = /* @__PURE__ */ styled(Flex)`
  ${popoverWrapperStyle}
`

/**
 * @internal
 */
export interface PopoverCardProps {
  /** @beta*/
  __unstable_margins?: PopoverMargins
  animate?: boolean
  arrow: boolean
  arrowRef: React.Ref<HTMLDivElement>
  arrowX?: number
  arrowY?: number
  originX?: number
  originY?: number
  overflow?: BoxOverflow
  padding?: number | number[]
  placement: Placement
  radius?: Radius | Radius[]
  scheme?: ThemeColorSchemeKey
  shadow?: number | number[]
  strategy: Strategy
  tone: CardTone
  width: number | undefined
  x: number | null
  y: number | null
}

/**
 * Layout shared by the static `PopoverCard` and the motion-wrapped card in
 * `popoverCardAnimated.tsx`. The root and wrapper components (and their extra props) are
 * injected, so the motion variant can pass `motion/react` components without this module
 * depending on them.
 *
 * @internal
 */
export const PopoverCardLayout = forwardRef(function PopoverCardLayout(
  props: PopoverCardProps & {
    cardComponent?: React.ElementType
    cardProps?: Record<string, unknown>
    flexComponent?: React.ElementType
    flexProps?: Record<string, unknown>
  } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_margins: marginsProp,
    animate,
    arrow,
    arrowRef,
    arrowX,
    arrowY,
    cardComponent: CardComponent = StyledCard,
    cardProps,
    children,
    flexComponent: FlexComponent = StyledFlex,
    flexProps,
    padding,
    placement,
    originX,
    originY,
    overflow,
    radius,
    scheme,
    shadow,
    strategy,
    style,
    tone,
    width,
    x: xProp,
    y: yProp,
    ...restProps
  } = props

  const {zIndex} = useLayer()

  // Get margins: [top, right, bottom, left]
  const margins: PopoverMargins = useMemo(
    () => marginsProp || DEFAULT_POPOVER_MARGINS,
    [marginsProp],
  )

  // Translate according to margins
  const x = (xProp ?? 0) + margins[3]
  const y = (yProp ?? 0) + margins[0]

  const rootStyle: CSSProperties = useMemo(
    () => ({
      left: x,
      originX,
      originY,
      position: strategy,
      top: y,
      width,
      zIndex,
      willChange: animate ? 'transform' : undefined,
      ...style,
    }),
    [animate, originX, originY, strategy, style, width, x, y, zIndex],
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
      data-ui="Popover"
      {...(restProps as CardProps)}
      {...cardProps}
      data-placement={placement}
      radius={radius}
      ref={ref}
      scheme={scheme}
      shadow={shadow}
      sizing="border"
      style={rootStyle}
      tone={tone}
    >
      <FlexComponent
        data-ui="Popover__wrapper"
        {...flexProps}
        direction="column"
        flex={1}
        overflow={overflow}
      >
        <Flex direction="column" flex={1} padding={padding}>
          {children}
        </Flex>
      </FlexComponent>

      {arrow && (
        <Arrow
          ref={arrowRef}
          style={arrowStyle}
          width={DEFAULT_POPOVER_ARROW_WIDTH}
          height={DEFAULT_POPOVER_ARROW_HEIGHT}
          radius={DEFAULT_POPOVER_ARROW_RADIUS}
        />
      )}
    </CardComponent>
  )
})
PopoverCardLayout.displayName = 'ForwardRef(PopoverCardLayout)'

/**
 * Static, motion-free popover card. Rendered synchronously when the popover is not animated, so
 * popover content (and any listeners it attaches, e.g. click-outside handling in `Menu`) mounts
 * in the same commit that opens the popover.
 *
 * @internal
 */
export const PopoverCard = forwardRef(function PopoverCard(
  props: PopoverCardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <PopoverCardLayout {...props} ref={ref} />
})
PopoverCard.displayName = 'ForwardRef(PopoverCard)'
