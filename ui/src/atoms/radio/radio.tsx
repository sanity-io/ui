import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {ThemeColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {radioBaseStyles, inputElementStyles} from './styles'

interface RadioProps {
  customValidity?: string
}

const Root = styled.div(radioBaseStyles)
const Input = styled.input<{scheme: ThemeColorSchemeKey}>(inputElementStyles)

export const Radio = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps,
    forwardedRef: React.Ref<HTMLInputElement>
  ) => {
    const {className, style, customValidity, ...restProps} = props
    const card = useCard()
    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root className={className} data-ui="Radio" style={style}>
        <Input type="radio" {...restProps} ref={ref} scheme={card.scheme} />
        <span />
      </Root>
    )
  }
)

Radio.displayName = 'Radio'
