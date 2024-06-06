import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

/**
 * @public
 */
export interface SwitchProps {
  indeterminate?: boolean
}

const Root = styled.span(switchBaseStyles)
const Input = styled.input(switchInputStyles)
const Representation = styled.span(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{$checked?: boolean; $indeterminate?: boolean}>(switchThumbStyles)

/**
 * The `Switch` component allows the user to toggle a setting on and off.
 *
 * Extends all properties of an `<input type="checkbox" />` element, except type.
 *
 * @public
 */
export const Switch = forwardRef(function Switch(
  props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const {checked, className, disabled, indeterminate, readOnly, style, ...restProps} = props
  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate])

  return (
    <Root className={className} data-ui="Switch" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...restProps}
        checked={indeterminate !== true && checked}
        disabled={disabled || readOnly}
        type="checkbox"
        ref={ref}
      />
      <Representation aria-hidden data-name="representation">
        <Track />
        <Thumb $checked={checked} $indeterminate={indeterminate} />
      </Representation>
    </Root>
  )
})
