import {Strategy} from '@floating-ui/react-dom'
import React, {CSSProperties, forwardRef, memo, useMemo} from 'react'
import styled, {CSSObject} from 'styled-components'
import {FLOATING_STATIC_SIDES} from '../../constants'
import {ThemeColorSchemeKey} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {useLayer} from '../../utils'
import {Box} from '../box'
import {Card} from '../card'
import {PopoverArrow} from './popoverArrow'

function popoverCardStyle(props: {$boundaryWidth?: number}): CSSObject {
  const {$boundaryWidth} = props

  return {
    maxWidth: $boundaryWidth ? `${$boundaryWidth - 16}px` : 'calc(100% - 16px)',
  }
}

const Root = memo(styled(Card)(popoverCardStyle))

/**
 * @internal
 */
export const PopoverCard = memo(
  forwardRef(function PopoverCard(
    props: {
      /**
       * @beta
       */
      __unstable_margins?: PopoverMargins
      arrow: boolean
      arrowRef: React.Ref<HTMLDivElement>
      arrowX?: number
      arrowY?: number
      availableHeight?: number
      availableWidth?: number
      boundaryWidth?: number
      overflow?: BoxOverflow
      padding?: number | number[]
      placement?: Placement
      radius?: number | number[]
      referenceWidth?: number
      scheme?: ThemeColorSchemeKey
      shadow?: number | number[]
      strategy: Strategy
      tone: CardTone
      width?: number | 'auto' | (number | 'auto')[]
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
      availableHeight,
      availableWidth,
      boundaryWidth,
      children,
      padding,
      placement,
      overflow,
      radius,
      referenceWidth: referenceWidthProp,
      scheme,
      shadow,
      strategy,
      tone,
      width,
      x: xProp,
      y: yProp,
      ...restProps
    } = props

    const {zIndex} = useLayer()

    // top right bottom left
    const margins: PopoverMargins = useMemo(() => marginsProp || [0, 0, 0, 0], [marginsProp])

    // translate according to margins
    const referenceWidth = referenceWidthProp
      ? referenceWidthProp - margins[1] - margins[3]
      : undefined
    const x = (xProp ?? 0) + margins[3]
    const y = (yProp ?? 0) + margins[0]

    const maxWidth = availableWidth
      ? Math.min(availableWidth - 8, referenceWidth || Infinity)
      : undefined

    const rootStyle: CSSProperties = useMemo(
      () => ({
        position: strategy,
        top: y,
        left: x,
        zIndex,
        width: referenceWidth,
        maxWidth: referenceWidth ? undefined : maxWidth,
      }),
      [referenceWidth, maxWidth, strategy, x, y, zIndex]
    )

    const wrapperStyle: CSSProperties = useMemo(
      () => ({
        minHeight: 25,
        maxHeight: availableHeight ? availableHeight - 8 : undefined,
      }),
      [availableHeight]
    )

    const staticSide = placement && FLOATING_STATIC_SIDES[placement.split('-')[0]]

    const arrowStyle: CSSProperties = useMemo(() => {
      const style: CSSProperties = {
        left: arrowX !== null ? arrowX : undefined,
        top: arrowY !== null ? arrowY : undefined,
        right: undefined,
        bottom: undefined,
      }

      if (staticSide) style[staticSide] = -27

      return style
    }, [arrowX, arrowY, staticSide])

    return (
      <Root
        {...restProps}
        $boundaryWidth={boundaryWidth}
        data-placement={placement}
        data-ui="Popover"
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
        style={rootStyle}
        tone={tone}
        $width={width}
      >
        <Box
          data-ui="Popover__wrapper"
          overflow={overflow}
          padding={padding}
          sizing="border"
          style={wrapperStyle}
        >
          {children}
        </Box>

        {arrow && <PopoverArrow ref={arrowRef} style={arrowStyle} />}
      </Root>
    )
  })
)

PopoverCard.displayName = 'PopoverCard'
