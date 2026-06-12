import {popover_card} from '@sanity/ui-css'
import {motion} from 'motion/react'
import {useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../core/constants'
import {Flex} from '../flex/Flex'
import {Layer} from '../layer/Layer'
import type {PopoverLayerProps} from './PopoverLayer'

// Re-exported so `Popover.tsx` can lazily load `AnimatePresence` from the same chunk as this
// module, avoiding both a static `motion/react` import and a second chunk request.
export {AnimatePresence} from 'motion/react'

/**
 * Motion-wrapped popover layer, kept in its own lazily loaded chunk so `motion/react` is only
 * evaluated once an animated popover opens.
 *
 * @internal
 */
export function PopoverLayerAnimated(props: PopoverLayerProps): React.JSX.Element {
  const {
    animate = false,
    children,
    maxWidth,
    originX,
    originY,
    overflow,
    padding,
    radius,
    referenceWidth,
    shadow,
    strategy,
    style,
    tone = 'inherit',
    x,
    y,
    ...rest
  } = props

  const rootStyle = useMemo(
    () => ({
      left: x,
      originX,
      originY,
      top: y,
      width: referenceWidth,
      willChange: animate ? 'transform' : undefined,
      ...style,
    }),
    [animate, originX, originY, referenceWidth, style, x, y],
  )

  return (
    <Layer
      className={popover_card()}
      data-ui="Popover"
      {...rest}
      animate={animate ? ['visible', 'scaleIn'] : undefined}
      as={motion.div}
      display="flex"
      exit={animate ? ['hidden', 'scaleOut'] : undefined}
      flexDirection="column"
      initial={animate ? ['hidden', 'initial'] : undefined}
      position={strategy}
      radius={radius}
      shadow={shadow}
      sizing="border"
      style={rootStyle}
      tone={tone}
      transition={POPOVER_MOTION_PROPS.transition}
      variants={POPOVER_MOTION_PROPS.card}
    >
      <Flex
        data-ui="Popover__wrapper"
        direction="column"
        flex={1}
        maxWidth={maxWidth}
        overflow={overflow}
        radius={radius}
        tabIndex={-1}
      >
        <Flex direction="column" flex={1} padding={padding}>
          {children}
        </Flex>
      </Flex>
    </Layer>
  )
}
