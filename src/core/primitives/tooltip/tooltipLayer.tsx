import {motion, type MotionStyle} from 'framer-motion'
import {type CSSProperties, type ForwardedRef, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import type {Placement} from '../../types/placement'
import {Arrow} from '../arrow/arrow'
import {Layer, type LayerOwnProps, type LayerProps} from '../layer/layer'
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
      as={motion.div}
      data-animate={animate ? '' : undefined}
      data-placement={placement}
      padding={padding}
      radius={radius}
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
    </Layer>
  )
}
