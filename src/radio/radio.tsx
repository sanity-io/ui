import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {radioBaseStyles, inputElementStyles, radioStyles} from './styles'

interface RadioProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  id: string
  name: string
  isChecked: boolean | undefined
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
}

const Root = styled.div(radioBaseStyles)
const InputElement = styled.input(inputElementStyles)
const RadioSelect = styled.div(radioStyles)

export const Radio = forwardRef(
  (
    {
      id,
      name,
      disabled,
      isChecked,
      onFocus,
      onBlur,
      onChange,
      ...restProps
    }: React.HTMLProps<HTMLInputElement> & RadioProps,
    ref: any
  ) => {
    return (
      <Root data-ui="Radio">
        <InputElement
          // ID used to link this input to the appropriate label
          id={id}
          // ID used to link this input to the appropriate description, if any
          aria-describedby={`${id}-description`}
          name={name}
          type="radio"
          disabled={disabled}
          checked={isChecked}
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...restProps}
        />
        <RadioSelect className="radio" />
      </Root>
    )
  }
)

Radio.displayName = 'Radio'
