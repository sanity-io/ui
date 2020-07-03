import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {boxBaseStyles, boxFlexStyles, boxPaddingStyles} from './styles'

export interface BoxPaddingProps {
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
  paddingRight?: number | number[]
}

export interface BoxFlexProps {
  flex?: number | number[]
}

export interface BoxProps extends BoxPaddingProps, BoxFlexProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

// @todo: Figure out typings
const Root = styled.div(boxBaseStyles, boxFlexStyles as any, boxPaddingStyles)

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
