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
  return (
    <Root data-ui="Radio">
      <Input type="radio" {...props} ref={ref} />
      <Representation data-name="representation" />
    </Root>
  )
})

Radio.displayName = 'Radio'
