import type {Strategy} from '@floating-ui/react-dom'
import {popover_card} from '@sanity/ui-css'
import {motion} from 'motion/react'
import {type CSSProperties, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import type {Placement} from '../../types'
import {Flex} from '../flex/Flex'
import {Layer, type LayerOwnProps, type LayerProps} from '../layer/Layer'
import {DEFAULT_POPOVER_MARGINS} from './constants'
import type {PopoverMargins} from './types'

/** @internal */
export const DEFAULT_POPOVER_LAYER_ELEMENT = 'div'

/** @internal */
export type PopoverLayerOwnProps = LayerOwnProps & {
  /** @beta*/
  __unstable_margins?: PopoverMargins
  animate?: boolean
  originX?: number
  originY?: number
  placement: Placement
  referenceWidth?: number
  strategy: Strategy
  x: number | null
  y: number | null
}

/** @internal */
export type PopoverLayerProps = PopoverLayerOwnProps & LayerProps<'div'>

/** @internal */
export function PopoverLayer(props: PopoverLayerProps): React.JSX.Element {
  const {
    __unstable_margins: marginsProp,
    animate,
    children,
    maxWidth,
    padding,
    placement,
    originX,
    originY,
    overflow,
    radius,
    referenceWidth,
    shadow,
    strategy,
    style,
    tone,
    x: xProp,
    y: yProp,
    ...rest
  } = props

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
      top: y,
      width: referenceWidth,
      willChange: animate ? 'transform' : undefined,
      ...style,
    }),
    [animate, originX, originY, referenceWidth, style, x, y],
  )

  return (
    // @ts-expect-error - TODO: fix this
    <Layer
      className={popover_card()}
      data-ui="Popover"
      {...rest}
      animate={animate ? ['visible', 'scaleIn'] : undefined}
      as={motion.div}
      data-context-tone={tone}
      data-placement={placement}
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
      >
        <Flex direction="column" flex={1} padding={padding}>
          {children}
        </Flex>
      </Flex>
    </Layer>
  )
}
