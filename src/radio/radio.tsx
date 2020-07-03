import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {radioBaseStyles, inputElementStyles, representationStyles} from './styles'

interface RadioProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div(radioBaseStyles)
const Input = styled.input(inputElementStyles)
const Representation = styled.div(representationStyles)

export const Radio = forwardRef((props: React.HTMLProps<HTMLInputElement> & RadioProps, ref) => {
  const {className, style, ...restProps} = props

  return (
    <Root className={className} data-ui="Radio" style={style}>
      <Input type="radio" {...restProps} ref={ref} />
      <Representation data-name="representation" />
    </Root>
  )
})

Radio.displayName = 'Radio'
