import React, {forwardRef, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

interface SwitchProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.span(switchBaseStyles)
const Input = styled.input(switchInputStyles)
const Representation = styled.span(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{checked?: boolean}>(switchThumbStyles)

export const Switch = forwardRef(
  (
    {checked, className, style, ...restProps}: React.HTMLProps<HTMLInputElement> & SwitchProps,
    ref
  ) => {
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
      <Root className={className} data-ui="Switch" style={style}>
        <Input {...restProps} checked={checked} type="checkbox" ref={setRef} />
        <Representation aria-hidden data-name="representation">
          <Track />
          <Thumb checked={checked} />
        </Representation>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
