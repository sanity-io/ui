import {type Placement, POPOVER_MOTION_PROPS} from '@sanity/ui/core'
import {Layer, type LayerOwnProps, type LayerProps} from '@sanity/ui/primitives/layer'
import {motion, type MotionStyle} from 'motion/react'
import {useMemo} from 'react'

/** @internal */
export const DEFAULT_TOOLTIP_LAYER_ELEMENT = 'div'

/** @internal */
export interface TooltipLayerOwnProps extends LayerOwnProps {
  animate?: boolean
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
    </Layer>
  )
}
