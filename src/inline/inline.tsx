import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getChildrenArray, getResponsiveProp} from '../helpers'
import {inlineBaseStyles, inlineSpaceStyles} from './styles'

interface InlineProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  space?: number | number[]
}

const Root = styled.div(inlineBaseStyles, inlineSpaceStyles)

export const Inline = forwardRef((props: React.HTMLProps<HTMLDivElement> & InlineProps, ref) => {
  const {children: childrenProp, space: spaceProp, ...restProps} = props
  const children = getChildrenArray(childrenProp).filter(Boolean)
  const space = getResponsiveProp(spaceProp, [])

  return (
    <Root data-ui="Inline" {...restProps} ref={ref} space={space}>
      {children.map((child, idx) => (
        <div key={idx}>{child}</div>
      ))}
    </Root>
  )
})

Inline.displayName = 'Inline'
