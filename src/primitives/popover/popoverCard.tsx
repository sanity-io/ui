import {Strategy} from '@floating-ui/react-dom'
import React, {CSSProperties, forwardRef, memo, useMemo} from 'react'
import styled from 'styled-components'
import {FLOATING_STATIC_SIDES} from '../../constants'
import {ThemeColorSchemeKey} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {useLayer} from '../../utils'
import {Card} from '../card'
import {Flex} from '../flex'
import {DEFAULT_POPOVER_ARROW_WIDTH, DEFAULT_POPOVER_MARGINS} from './constants'
import {PopoverArrow} from './popoverArrow'

const Root = styled(Card)({
  '&:not([hidden])': {
    display: 'flex',
  },
  flexDirection: 'column',
  width: 'max-content',
  minWidth: 'min-content',
})

/**
 * @internal
 */
export const PopoverCard = memo(
  forwardRef(function PopoverCard(
    props: {
      /** @beta*/
      __unstable_margins?: PopoverMargins
      arrow: boolean
      arrowRef: React.Ref<HTMLDivElement>
      arrowX?: number
      arrowY?: number
      overflow?: BoxOverflow
      padding?: number | number[]
      placement?: Placement
      radius?: number | number[]
      scheme?: ThemeColorSchemeKey
      shadow?: number | number[]
      strategy: Strategy
      tone: CardTone
      width: number | undefined
      x: number | null
      y: number | null
    } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const {
      __unstable_margins: marginsProp,
      arrow,
      arrowRef,
      arrowX,
      arrowY,
      children,
      padding,
      placement,
      overflow,
      radius,
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
      [marginsProp]
    )

    // Translate according to margins
    const x = (xProp ?? 0) + margins[3]
    const y = (yProp ?? 0) + margins[0]

    const rootStyle: CSSProperties = useMemo(
      () => ({
        position: strategy,
        top: y,
        left: x,
        width,
        zIndex,
        ...style,
      }),
      [strategy, style, width, x, y, zIndex]
    )

    const staticSide = placement && FLOATING_STATIC_SIDES[placement.split('-')[0]]

    const arrowStyle: CSSProperties = useMemo(() => {
      const style: CSSProperties = {
        left: arrowX !== null ? arrowX : undefined,
        top: arrowY !== null ? arrowY : undefined,
        right: undefined,
        bottom: undefined,
      }

      if (staticSide) style[staticSide] = 0 - DEFAULT_POPOVER_ARROW_WIDTH

      return style
    }, [arrowX, arrowY, staticSide])

    return (
      <Root
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
      >
        <Flex data-ui="Popover__wrapper" direction="column" flex={1} overflow={overflow}>
          <Flex direction="column" flex={1} padding={padding}>
            {children}
          </Flex>
        </Flex>

        {arrow && <PopoverArrow ref={arrowRef} style={arrowStyle} />}
      </Root>
    )
  })
)

PopoverCard.displayName = 'PopoverCard'
