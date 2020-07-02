import React, {forwardRef, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {
  switchBaseStyles,
  wrapperStyles,
  thumbStyles,
  trackStyles,
  inputElementStyles,
} from './styles'

interface SwitchProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.span(switchBaseStyles)
const InputElement = styled.input(inputElementStyles)
const Wrapper = styled.div(wrapperStyles)
const Thumb = styled.div(thumbStyles)
const Track = styled.div(trackStyles)

export const Switch = forwardRef(
  ({checked, ...restProps}: React.HTMLProps<HTMLInputElement> & SwitchProps, ref) => {
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
      <Root data-ui="Switch">
        <InputElement {...restProps} checked={checked} type="checkbox" ref={setRef} />
        <Wrapper className="wrapper">
          <Track className="track" />
          <Thumb className="thumb" />
        </Wrapper>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
