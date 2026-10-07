import {Strategy} from '@floating-ui/react-dom'
import {motion} from 'motion/react'
import React, {CSSProperties, useMemo} from 'react'
import {styled} from 'styled-components'

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {POPOVER_MOTION_PROPS} from '../../constants'
import {getTransformOrigin} from '../../middleware/origin'
import {BoxOverflow} from '../../types/box'
import {CardTone} from '../../types/card'
import {Placement} from '../../types/placement'
import {PopoverMargins} from '../../types/popover'
import {Radius} from '../../types/radius'
import {Arrow} from '../../utils/arrow/arrow'
import {useLayer} from '../../utils/layer/useLayer'
import {Card} from '../card/card'
import {Flex} from '../flex/flex'
import {
  DEFAULT_POPOVER_ARROW_HEIGHT,
  DEFAULT_POPOVER_ARROW_RADIUS,
  DEFAULT_POPOVER_ARROW_WIDTH,
  DEFAULT_POPOVER_MARGINS,
} from './constants'

/**
 * A size style of the card (see the `maxHeight` prop): `undefined` while the `size` middleware
 * owns it, whatever the consumer's `style` says; otherwise the popover's own value, and the
 * consumer's only where the popover has none (`''`), as the effect that used to re-apply the
 * popover's width and max width after every render made it.
 */
function sizeStyle(
  value: number | '' | undefined,
  consumerValue: number | string | undefined,
): number | string | undefined {
  if (value === undefined) return undefined

  return value === '' ? (consumerValue ?? '') : value
}

const MotionCard = styled(motion.create(Card))`
  &:not([hidden]) {
    display: flex;
  }
  flex-direction: column;
  width: max-content;
  min-width: min-content;
  will-change: transform;
`

/**
 * @internal
 */
export function PopoverCard(
  props: {
    /** @beta*/
    __unstable_margins?: PopoverMargins
    animate?: boolean
    arrow: boolean
    arrowRef: React.Ref<HTMLDivElement>
    arrowX?: number
    arrowY?: number
    /**
     * The size styles (`width`, `maxWidth`, `maxHeight`) are rendered by React except while the
     * `size` middleware writes them to the element itself during positioning (`width` for
     * `matchReferenceWidth`, `maxWidth` and `maxHeight` for `constrainSize`). Pass `undefined`
     * while the middleware owns one, so that React never touches it, and a value or `''`
     * otherwise, so that React clears what the middleware wrote once it no longer owns it.
     */
    maxHeight: '' | undefined
    maxWidth: number | '' | undefined
    originX?: number
    originY?: number
    overflow?: BoxOverflow
    padding?: number | number[]
    placement: Placement
    radius?: Radius | Radius[]
    scheme?: ThemeColorSchemeKey
    shadow?: number | number[]
    strategy: Strategy
    tone: CardTone
    /** See `maxHeight` */
    width: number | '' | undefined
    x: number | null
    y: number | null
  } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
) {
  const {
    __unstable_margins: marginsProp,
    animate,
    arrow,
    arrowRef,
    arrowX,
    arrowY,
    children,
    maxHeight,
    maxWidth,
    padding,
    placement,
    originX,
    originY,
    overflow,
    radius,
    ref,
    scheme,
    shadow,
    strategy,
    style,
    tone,
    width,
    x: xProp,
    y: yProp,
    ...restProps
  } = props

  const {zIndex} = useLayer()

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
      position: strategy,
      top: y,
      transformOrigin: getTransformOrigin(originX, originY),
      zIndex,
      willChange: animate ? 'transform' : undefined,
      ...style,
      // After the consumer's `style`: a size the middleware owns must not come back through it, or
      // React would write it over the middleware's value on the next change of that style
      maxHeight: sizeStyle(maxHeight, style?.maxHeight),
      maxWidth: sizeStyle(maxWidth, style?.maxWidth),
      width: sizeStyle(width, style?.width),
    }),
    [animate, maxHeight, maxWidth, originX, originY, strategy, style, width, x, y, zIndex],
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
      data-ui="Popover"
      {...restProps}
      data-placement={placement}
      radius={radius}
      ref={ref}
      scheme={scheme}
      shadow={shadow}
      sizing="border"
      style={rootStyle}
      tone={tone}
      {...(animate ? POPOVER_MOTION_PROPS : undefined)}
    >
      <Flex data-ui="Popover__wrapper" direction="column" flex={1} overflow={overflow}>
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
    </MotionCard>
  )
}
