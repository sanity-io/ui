import {motion, type MotionStyle} from 'motion/react'
import {useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../core/constants'
import {Layer} from '../layer/Layer'
import type {TooltipLayerProps} from './TooltipLayer'

// Re-exported so `Tooltip.tsx` can lazily load `AnimatePresence` from the same chunk as this
// module, avoiding both a static `motion/react` import and a second chunk request.
export {AnimatePresence} from 'motion/react'

/**
 * Motion-wrapped tooltip layer, kept in its own lazily loaded chunk so `motion/react` is only
 * evaluated once an animated tooltip is shown.
 *
 * @internal
 */
export function TooltipLayerAnimated(props: TooltipLayerProps): React.JSX.Element {
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
    tone,
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
