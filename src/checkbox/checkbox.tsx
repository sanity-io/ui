import React, {forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import {checkboxBaseStyles, wrapperStyles, inputElementStyles, markStyles} from './styles'

interface CheckboxProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  id: string
  isChecked: boolean | undefined
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
}

const Root = styled.div(checkboxBaseStyles)
const InputElement = styled.input(inputElementStyles)
const Wrapper = styled.div(wrapperStyles)
const Svg = styled.svg(markStyles)

export const Checkbox = forwardRef(
  (
    {
      id,
      disabled,
      isChecked,
      onFocus,
      onBlur,
      onChange,
      ...restProps
    }: React.HTMLProps<HTMLInputElement> & CheckboxProps,
    ref: any
  ) => {
    useEffect(() => {
      // Set the indeterminate state if checked value is undefined
      if (typeof isChecked === 'undefined' && ref?.current) {
        ref.current.indeterminate = true
      }
    })

    return (
      <Root data-ui="Checkbox">
        <InputElement
          // ID used to link this input to the appropriate label
          id={id}
          // ID used to link this input to the appropriate description, if any
          aria-describedby={`${id}-description`}
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...restProps}
        />
        <Wrapper className="wrapper">
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
        </Wrapper>
      </Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
