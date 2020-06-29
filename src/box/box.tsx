import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {boxPaddingStyles} from './styles'

interface BoxProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  paddingTop?: number | number[]
  paddingBottom?: number | number[]
  paddingLeft?: number | number[]
  paddingRight?: number | number[]
}

const Root = styled.div(boxPaddingStyles)

export const Box = forwardRef((props: React.HTMLProps<HTMLDivElement> & BoxProps, ref) => {
  const {
    as: asProp = 'div',
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

  return (
    <Root data-ui="Box" {...restProps} {...paddingProps} as={asProp} ref={ref}>
      {props.children}
    </Root>
  )
})

Box.displayName = 'Box'
