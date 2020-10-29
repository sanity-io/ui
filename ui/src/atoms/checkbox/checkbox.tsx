import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import React, {forwardRef, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {checkboxBaseStyles, inputElementStyles} from './styles'

interface CheckboxProps {}

const Root = styled.div(checkboxBaseStyles)
const Input = styled.input<{scheme: ColorSchemeKey}>(inputElementStyles)

export const Checkbox = forwardRef(
  (props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & CheckboxProps, ref) => {
    const {checked, className, style, ...restProps} = props
    const inputRef = useRef<HTMLInputElement | null>(null)
    const card = useCard()

    useEffect(() => {
      // Set the indeterminate state if checked value is undefined
      if (inputRef.current) {
        inputRef.current.indeterminate = checked === undefined
      }
    }, [checked])

    const setRef = (inputElement: HTMLInputElement | null) => {
      if (typeof ref === 'function') {
        ref(inputElement)
      } else if (ref) {
        ref.current = inputElement
      }

      inputRef.current = inputElement
    }

    return (
      <Root className={className} data-ui="Checkbox" style={style}>
        <Input {...restProps} checked={checked} type="checkbox" ref={setRef} scheme={card.scheme} />
        <span>
          <CheckmarkIcon />
          <RemoveIcon />
        </span>
      </Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
