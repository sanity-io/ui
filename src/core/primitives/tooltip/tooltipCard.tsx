import {tooltipCard} from '@sanity/ui/css'
import {motion} from 'framer-motion'
import {CSSProperties, ForwardedRef, forwardRef, memo, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import {Placement, Props} from '../../types'
import {Arrow} from '../../utils'
import {Card, CardProps} from '../card'
import {
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
} from './constants'

const MotionCard = motion.create(Card)

/* @internal */
export interface TooltipCardProps extends CardProps {
  animate?: boolean
  arrow: boolean
  arrowRef: ForwardedRef<HTMLDivElement>
  arrowX?: number
  arrowY?: number
  originX?: number
  originY?: number
  placement?: Placement
}

/**
 * @internal
 */
export const TooltipCard = memo(
  forwardRef(function TooltipCard(
    props: Omit<
      Props<TooltipCardProps, 'div'>,
      'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'
    >,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    const {
      animate,
      arrow,
      arrowRef,
      arrowX,
      arrowY,
      children,
      originX,
      originY,
      padding,
      placement,
      radius,
      scheme,
      shadow,
      style,
      tone,
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
      <MotionCard
        data-ui="Tooltip__card"
        {...restProps}
        data-animate={animate ? '' : undefined}
        className={tooltipCard()}
        data-placement={placement}
        padding={padding}
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
        style={rootStyle}
        variants={POPOVER_MOTION_PROPS.card}
        transition={POPOVER_MOTION_PROPS.transition}
        initial={animate ? ['hidden', 'initial'] : undefined}
        animate={animate ? ['visible', 'scaleIn'] : undefined}
        exit={animate ? ['hidden', 'scaleOut'] : undefined}
        tone={tone}
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
      </MotionCard>
    )
  }),
)

TooltipCard.displayName = 'Memo(ForwardRef(TooltipCard))'
