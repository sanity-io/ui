import type {Strategy} from '@floating-ui/react-dom'
import {popover_card} from '@sanity/ui/css'
import {type HTMLMotionProps, motion} from 'motion/react'
import {useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import type {Assign} from '../../types'
import {Flex} from '../flex/Flex'
import {Layer, type LayerOwnProps} from '../layer/Layer'

/** @internal */
export interface PopoverLayerOwnProps extends LayerOwnProps {
  /**
   * Whether the popover should animate in and out.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
  children?: React.ReactNode
  originX?: number
  originY?: number
  referenceWidth?: number
  strategy?: Strategy
  x?: number
  y?: number
}

/** @public */
export type PopoverLayerProps = Assign<HTMLMotionProps<'div'>, PopoverLayerOwnProps>

/** @internal */
export function PopoverLayer(props: PopoverLayerProps): React.JSX.Element {
  const {
    animate = false,
    children,
    maxWidth,
    padding,
    originX,
    originY,
    overflow,
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
