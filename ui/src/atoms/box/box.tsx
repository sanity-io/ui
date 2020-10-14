import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {space} from '../../styles'
import {getResponsiveProp} from '../helpers'
import {boxBaseStyles, boxFlexStyles} from './styles'

export interface BoxMarginProps {
  margin?: number | number[]
  marginX?: number | number[]
  marginY?: number | number[]
  marginTop?: number | number[]
  marginBottom?: number | number[]
  marginLeft?: number | number[]
  marginRight?: number | number[]
}

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

export interface BoxProps extends BoxMarginProps, BoxPaddingProps, BoxFlexProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

// @todo: Figure out typings
const Root = styled.div(boxBaseStyles, boxFlexStyles as any, space)

export const Box = forwardRef((props: React.HTMLProps<HTMLDivElement> & BoxProps, ref) => {
  const {
    as: asProp = 'div',
    flex: flexProp,
    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...restProps
  } = props

  const spaceProps = {
    margin: getResponsiveProp(margin),
    marginX: getResponsiveProp(marginX),
    marginY: getResponsiveProp(marginY),
    marginTop: getResponsiveProp(marginTop),
    marginBottom: getResponsiveProp(marginBottom),
    marginLeft: getResponsiveProp(marginLeft),
    marginRight: getResponsiveProp(marginRight),
    padding: getResponsiveProp(padding),
    paddingX: getResponsiveProp(paddingX),
    paddingY: getResponsiveProp(paddingY),
    paddingTop: getResponsiveProp(paddingTop),
    paddingBottom: getResponsiveProp(paddingBottom),
    paddingLeft: getResponsiveProp(paddingLeft),
    paddingRight: getResponsiveProp(paddingRight),
  }

  const flex = getResponsiveProp(flexProp)

  return (
    <Root data-ui="Box" {...restProps} {...spaceProps} as={asProp} flex={flex} ref={ref}>
      {props.children}
    </Root>
  )
})

Box.displayName = 'Box'
