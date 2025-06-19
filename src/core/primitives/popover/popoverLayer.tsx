import type {Strategy} from '@floating-ui/react-dom'
import {popoverCard} from '@sanity/ui/css'
import {motion} from 'framer-motion'
import {type CSSProperties, type ForwardedRef, useMemo} from 'react'

import {POPOVER_MOTION_PROPS} from '../../constants'
import type {Placement} from '../../types/placement'
import {Arrow} from '../arrow/arrow'
import {Flex} from '../flex/flex'
import {Layer, type LayerOwnProps, type LayerProps} from '../layer/layer'
import {
  DEFAULT_POPOVER_ARROW_HEIGHT,
  DEFAULT_POPOVER_ARROW_RADIUS,
  DEFAULT_POPOVER_ARROW_WIDTH,
  DEFAULT_POPOVER_MARGINS,
} from './constants'
import type {PopoverMargins} from './types'

/** @internal */
export const DEFAULT_POPOVER_LAYER_ELEMENT = 'div'

/** @internal */
export type PopoverLayerOwnProps = LayerOwnProps & {
  /** @beta*/
  __unstable_margins?: PopoverMargins
  animate?: boolean
  arrow: boolean
  arrowRef: ForwardedRef<HTMLDivElement>
  arrowX?: number
  arrowY?: number
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
    arrow,
    arrowRef,
    arrowX,
    arrowY,
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
    tone = 'inherit',
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
      className={popoverCard()}
      data-ui="Popover"
      {...rest}
      as={motion.div}
      data-context-tone={tone}
      data-placement={placement}
      flexDirection="column"
      display="flex"
      position={strategy}
      radius={radius}
      shadow={shadow}
      sizing="border"
      style={rootStyle}
      tone={tone}
      variants={POPOVER_MOTION_PROPS.card}
      transition={POPOVER_MOTION_PROPS.transition}
      initial={animate ? ['hidden', 'initial'] : undefined}
      animate={animate ? ['visible', 'scaleIn'] : undefined}
      exit={animate ? ['hidden', 'scaleOut'] : undefined}
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

      {arrow && (
        <Arrow
          ref={arrowRef}
          style={arrowStyle}
          width={DEFAULT_POPOVER_ARROW_WIDTH}
          height={DEFAULT_POPOVER_ARROW_HEIGHT}
          radius={DEFAULT_POPOVER_ARROW_RADIUS}
        />
      )}
    </Layer>
  )
}
