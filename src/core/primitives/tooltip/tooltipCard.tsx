import {RadiusStyleProps, tooltipCard} from '@sanity/ui/css'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {motion} from 'framer-motion'
import React, {CSSProperties, forwardRef, memo, useMemo} from 'react'
import {
  // POPOVER_MOTION_CONTENT_OPACITY_PROPERTY,
  POPOVER_MOTION_PROPS,
} from '../../constants'
import {Placement} from '../../types'
import {Arrow} from '../../utils'
import {Card} from '../card'
import {
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
} from './constants'

const MotionCard = motion(Card) as typeof Card

/**
 * @internal
 */
export const TooltipCard = memo(
  forwardRef(function TooltipCard(
    props: {
      animate?: boolean
      arrow: boolean
      arrowRef: React.Ref<HTMLDivElement>
      arrowX?: number
      arrowY?: number
      originX?: number
      originY?: number
      padding?: number | number[]
      placement?: Placement
      scheme?: ThemeColorSchemeKey
      shadow?: number | number[]
    } & RadiusStyleProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'rows' | 'width' | 'wrap'>,
    ref: React.ForwardedRef<HTMLDivElement>,
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
        {...(animate ? POPOVER_MOTION_PROPS : {})}
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
