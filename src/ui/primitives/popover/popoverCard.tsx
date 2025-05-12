import {Strategy} from '@floating-ui/react-dom'
import {motion, MotionProps} from 'framer-motion'
import {CSSProperties, ForwardedRef, forwardRef, memo, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import {Placement, PopoverMargins, Props} from '../../types'
import {Arrow, useLayer} from '../../utils'
import {Card, CardProps} from '../card'
import {Flex} from '../flex'
import {
  DEFAULT_POPOVER_ARROW_HEIGHT,
  DEFAULT_POPOVER_ARROW_RADIUS,
  DEFAULT_POPOVER_ARROW_WIDTH,
  DEFAULT_POPOVER_MARGINS,
} from './constants'

/** @internal */
export interface PopoverCardProps extends CardProps {
  /** @beta*/
  __unstable_margins?: PopoverMargins
  animate?: boolean
  arrow: boolean
  arrowRef: ForwardedRef<HTMLDivElement>
  arrowX?: number
  arrowY?: number
  originX?: number
  originY?: number
  placement: Placement
  referenceWidth?: number
  strategy: Strategy
  x: number | null
  y: number | null
}

const MotionCard = motion.create(Card)

/**
 * @internal
 */
export const PopoverCard = memo(
  forwardRef(function PopoverCard(
    props: Props<PopoverCardProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    const {
      __unstable_margins: marginsProp,
      animate,
      arrow,
      arrowRef,
      arrowX,
      arrowY,
      children,
      maxWidth,
      padding,
      placement,
      originX,
      originY,
      overflow,
      radius,
      referenceWidth,
      scheme,
      shadow,
      strategy,
      style,
      tone,
      // width,
      x: xProp,
      y: yProp,
      ...restProps
    } = props

    const layer = useLayer()

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
        width: referenceWidth,
        zIndex: layer.zIndex ?? 100,
        willChange: animate ? 'transform' : undefined,
        ...style,
      }),
      [animate, layer.zIndex, originX, originY, referenceWidth, strategy, style, x, y],
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
        className="popover-card"
        data-ui="Popover"
        {...(restProps as CardProps & MotionProps)}
        data-placement={placement}
        direction="column"
        display="flex"
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
        sizing="border"
        style={rootStyle}
        tone={tone}
        variants={POPOVER_MOTION_PROPS.card}
        transition={POPOVER_MOTION_PROPS.transition}
        initial={animate ? ['hidden', 'initial'] : undefined}
        animate={animate ? ['visible', 'scaleIn'] : undefined}
        exit={animate ? ['hidden', 'scaleOut'] : undefined}
      >
        <Flex
          data-ui="Popover__wrapper"
          direction="column"
          flex={1}
          maxWidth={maxWidth}
          overflow={overflow}
        >
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
PopoverCard.displayName = 'Memo(ForwardRef(PopoverCard))'
