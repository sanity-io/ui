import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import React, {forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {ThemeColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {checkboxBaseStyles, inputElementStyles} from './styles'

interface CheckboxProps {
  indeterminate?: boolean
  customValidity?: string
}

const Root = styled.div(checkboxBaseStyles)
const Input = styled.input<{scheme: ThemeColorSchemeKey}>(inputElementStyles)

export const Checkbox = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & CheckboxProps,
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {checked, className, indeterminate, customValidity, style, ...restProps} = props
    const card = useCard()
    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    useEffect(() => {
      if (ref.current) {
        // Set the indeterminate state
        ref.current.indeterminate = indeterminate || false
      }
    }, [indeterminate, ref])

    return (
      <Root className={className} data-ui="Checkbox" style={style}>
        <Input {...restProps} checked={checked} type="checkbox" ref={ref} scheme={card.scheme} />
        <span>
          <CheckmarkIcon />
          <RemoveIcon />
        </span>
      </Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
