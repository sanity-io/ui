import {Strategy} from '@floating-ui/react-dom'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {MotionProps, motion} from 'framer-motion'
import React, {CSSProperties, forwardRef, memo, useMemo} from 'react'
import {styled} from 'styled-components'
import {POPOVER_MOTION_CONTENT_OPACITY_PROPERTY, POPOVER_MOTION_PROPS} from '../../constants'
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

const MotionCard = styled(motion(Card))`
  &:not([hidden]) {
    display: flex;
  }
  flex-direction: column;
  width: max-content;
  min-width: min-content;
  & > * {
    opacity: var(${POPOVER_MOTION_CONTENT_OPACITY_PROPERTY}, 1);
    will-change: opacity;
  }
`

/**
 * @internal
 */
export const PopoverCard = memo(
  forwardRef(function PopoverCard(
    props: {
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
      children,
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
      <MotionCard
        data-ui="Popover"
        {...(restProps as CardProps & MotionProps)}
        data-placement={placement}
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
        sizing="border"
        style={rootStyle}
        tone={tone}
        {...(animate ? POPOVER_MOTION_PROPS : {})}
      >
        <Flex data-ui="Popover__wrapper" direction="column" flex={1} overflow={overflow}>
          <Flex direction="column" flex={1} padding={padding}>
            {children}
          </Flex>
        </Flex>

        {arrow && (
          <Arrow
            ref={arrowRef}
            style={arrowStyle}
            width={DEFAULT_POPOVER_ARROW_WIDTH}
            height={DEFAULT_POPOVER_ARROW_HEIGHT}
            radius={DEFAULT_POPOVER_ARROW_RADIUS}
          />
        )}
      </MotionCard>
    )
  }),
)

PopoverCard.displayName = 'PopoverCard'
