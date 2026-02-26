import {motion, type MotionStyle} from 'motion/react'
import {type CSSProperties, type ForwardedRef, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import type {Placement} from '../../types'
import {Arrow} from '../arrow/Arrow'
import {Layer, type LayerOwnProps, type LayerProps} from '../layer/Layer'
import {
  DEFAULT_TOOLTIP_ARROW_HEIGHT,
  DEFAULT_TOOLTIP_ARROW_RADIUS,
  DEFAULT_TOOLTIP_ARROW_WIDTH,
} from './constants'

/* @internal */
export const DEFAULT_TOOLTIP_LAYER_ELEMENT = 'div'

/* @internal */
export interface TooltipLayerOwnProps extends LayerOwnProps {
  animate?: boolean
  arrow: boolean
  arrowRef: ForwardedRef<HTMLDivElement>
  arrowX?: number
  arrowY?: number
  originX?: number
  originY?: number
  placement?: Placement
}

/** @internal */
export type TooltipLayerProps = TooltipLayerOwnProps & LayerProps<'div'>

/** @internal */
export function TooltipLayer(props: TooltipLayerProps): React.JSX.Element {
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
    tone = 'inherit',
    ...rest
  } = props

  const rootStyle: MotionStyle = useMemo(
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
    // @ts-expect-error - TODO: fix this
    <Layer
      data-ui="Tooltip__layer"
      {...rest}
      animate={animate ? ['visible', 'scaleIn'] : undefined}
      as={motion.div}
      data-animate={animate ? '' : undefined}
      data-placement={placement}
      exit={animate ? ['hidden', 'scaleOut'] : undefined}
      initial={animate ? ['hidden', 'initial'] : undefined}
      padding={padding}
      radius={radius}
      scheme={scheme}
      shadow={shadow}
      style={rootStyle}
      tone={tone}
      transition={POPOVER_MOTION_PROPS.transition}
      variants={POPOVER_MOTION_PROPS.card}
    >
      {children}

      {arrow && (
        <Arrow
          ref={arrowRef}
          height={DEFAULT_TOOLTIP_ARROW_HEIGHT}
          radius={DEFAULT_TOOLTIP_ARROW_RADIUS}
          style={arrowStyle}
          width={DEFAULT_TOOLTIP_ARROW_WIDTH}
        />
      )}
    </Layer>
  )
}
