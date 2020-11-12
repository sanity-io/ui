import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {radioBaseStyles, inputElementStyles} from './styles'

interface RadioProps {}

const Root = styled.div(radioBaseStyles)
const Input = styled.input<{scheme: ColorSchemeKey}>(inputElementStyles)

export const Radio = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {className, style, ...restProps} = props
    const card = useCard()

    return (
      <Root className={className} data-ui="Radio" style={style}>
        <Input type="radio" {...restProps} ref={ref} scheme={card.scheme} />
        <span />
      </Root>
    )
  }
)

Radio.displayName = 'Radio'
