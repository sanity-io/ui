import React, {forwardRef, useEffect} from 'react'
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
  id: string
  isChecked: boolean | undefined
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
}

const Root = styled.div(switchBaseStyles)
const InputElement = styled.input(inputElementStyles)
const Wrapper = styled.div(wrapperStyles)
const Thumb = styled.div(thumbStyles)
const Track = styled.div(trackStyles)

export const Switch = forwardRef(
  (
    {
      id,
      disabled,
      isChecked,
      onFocus,
      onBlur,
      onChange,
      ...restProps
    }: React.HTMLProps<HTMLInputElement> & SwitchProps,
    ref: any
  ) => {
    useEffect(() => {
      // Set the indeterminate state if checked value is undefined
      if (typeof isChecked === 'undefined' && ref?.current) {
        ref.current.indeterminate = true
      }
    })

    return (
      <Root data-ui="Switch">
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
          <Track className="track" />
          <Thumb className="thumb" />
        </Wrapper>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
