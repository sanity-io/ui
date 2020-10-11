import React, {forwardRef, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {checkboxBaseStyles, representationStyles, inputElementStyles, markStyles} from './styles'

interface CheckboxProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

const Root = styled.div(checkboxBaseStyles)
const Input = styled.input(inputElementStyles)
const Representation = styled.div(representationStyles)
const Svg = styled.svg(markStyles)

export const Checkbox = forwardRef(
  (props: React.HTMLProps<HTMLInputElement> & CheckboxProps, ref) => {
    const {checked, className, style, ...restProps} = props
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
      <Root className={className} data-ui="Checkbox" style={style}>
        <Input {...restProps} checked={checked} type="checkbox" ref={setRef} />
        <Representation data-name="representation">
          <Svg
            className="checkmark"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.73999 4.5L4.13999 7.9L10.6 1.44" stroke="currentColor" strokeWidth="2" />
          </Svg>
          <Svg
            className="indeterminate"
            viewBox="0 0 9 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.0799561 1.5H8.91996" stroke="currentColor" strokeWidth="2" />
          </Svg>
        </Representation>
      </Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
