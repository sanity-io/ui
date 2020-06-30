import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {boxFlexStyles, boxPaddingStyles} from './styles'

export interface BoxPaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
  paddingRight?: number | number[]
}

interface BoxBaseProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  flex?: number | number[]
}

type BoxProps = BoxPaddingProps & BoxBaseProps

// @todo: Figure out typings
const Root = styled.div(boxFlexStyles as any, boxPaddingStyles)

export const Box = forwardRef((props: React.HTMLProps<HTMLDivElement> & BoxProps, ref) => {
  const {
    as: asProp = 'div',
    flex: flexProp,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...restProps
  } = props

  const paddingProps = {
    padding: getResponsiveProp(padding, [0]),
    paddingX: getResponsiveProp(paddingX, []),
    paddingY: getResponsiveProp(paddingY, []),
    paddingTop: getResponsiveProp(paddingTop, []),
    paddingBottom: getResponsiveProp(paddingBottom, []),
    paddingLeft: getResponsiveProp(paddingLeft, []),
    paddingRight: getResponsiveProp(paddingRight, []),
  }

  const flex = getResponsiveProp(flexProp, [])

  return (
    <Root data-ui="Box" {...restProps} {...paddingProps} as={asProp} flex={flex} ref={ref}>
      {props.children}
    </Root>
  )
})

Box.displayName = 'Box'
