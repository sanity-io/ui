import React, {forwardRef, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

interface SwitchProps {
  indeterminate?: boolean
}

const Root = styled.span<{scheme: ColorSchemeKey}>(switchBaseStyles)
const Input = styled.input<{scheme: ColorSchemeKey}>(switchInputStyles)
const Representation = styled.span<{scheme: ColorSchemeKey}>(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{checked?: boolean; indeterminate?: boolean}>(switchThumbStyles)

export const Switch = forwardRef(
  (props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps, ref) => {
    const {checked, className, indeterminate, style, ...restProps} = props
    const card = useCard()
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      if (inputRef.current) {
        // Set the indeterminate state
        inputRef.current.indeterminate = indeterminate || false
      }
    }, [indeterminate])

    const setRef = (inputElement: HTMLInputElement | null) => {
      if (typeof ref === 'function') {
        ref(inputElement)
      } else if (ref) {
        ref.current = inputElement
      }

      inputRef.current = inputElement
    }

    return (
      <Root className={className} data-ui="Switch" style={style} scheme={card.scheme}>
        <Input
          {...restProps}
          checked={indeterminate !== true && checked}
          scheme={card.scheme}
          type="checkbox"
          ref={setRef}
        />
        <Representation aria-hidden data-name="representation" scheme={card.scheme}>
          <Track />
          <Thumb checked={checked} indeterminate={indeterminate} />
        </Representation>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
