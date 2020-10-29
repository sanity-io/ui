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

interface SwitchProps {}

const Root = styled.span<{scheme: ColorSchemeKey}>(switchBaseStyles)
const Input = styled.input<{scheme: ColorSchemeKey}>(switchInputStyles)
const Representation = styled.span<{scheme: ColorSchemeKey}>(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{checked?: boolean}>(switchThumbStyles)

export const Switch = forwardRef(
  (
    {
      checked,
      className,
      style,
      ...restProps
    }: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps,
    ref
  ) => {
    const card = useCard()

    const inputRef = useRef<HTMLInputElement | null>(null)

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
      <Root className={className} data-ui="Switch" style={style} scheme={card.scheme}>
        <Input
          {...restProps}
          checked={checked || false}
          scheme={card.scheme}
          type="checkbox"
          ref={setRef}
        />
        <Representation aria-hidden data-name="representation" scheme={card.scheme}>
          <Track />
          <Thumb checked={checked} />
        </Representation>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
