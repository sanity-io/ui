import {clsx} from 'clsx/lite'
import {motion} from 'motion/react'
import React, {CSSProperties, useMemo} from 'react'

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {POPOVER_MOTION_PROPS} from '../../constants'
import {Placement} from '../../types/placement'
import {Radius} from '../../types/radius'
import {Arrow} from '../../utils/arrow/arrow'
import {Card} from '../card/card'
import {
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
} from './constants'

import {tooltipCard} from './tooltip.css'

const MotionCard = motion.create(Card)

/**
 * @internal
 */
export function TooltipCard(
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
    radius?: Radius | Radius[]
    scheme?: ThemeColorSchemeKey
    shadow?: number | number[]
  } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
) {
  const {
    animate,
    arrow,
    arrowRef,
    arrowX,
    arrowY,
    children,
    className,
    originX,
    originY,
    padding,
    placement,
    radius,
    ref,
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
      className={clsx(tooltipCard, className)}
      data-ui="Tooltip__card"
      {...restProps}
      data-placement={placement}
      padding={padding}
      radius={radius}
      ref={ref}
      scheme={scheme}
      shadow={shadow}
      style={rootStyle}
      {...(animate ? POPOVER_MOTION_PROPS : undefined)}
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
}
