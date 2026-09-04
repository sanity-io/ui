import {clsx} from 'clsx/lite'
import {useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import {inputElementStyle} from './styles'

import {radio} from './radio.css'

/**
 * @public
 */
export interface RadioProps {
  customValidity?: string
}

const Input = styled.input(inputElementStyle)

/**
 * The `Radio` component allows the user to select one option from a set.
 *
 * @public
 */
export function Radio(props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & RadioProps) {
  const {
    className,
    disabled,
    style,
    customValidity,
    readOnly,
    ref: forwardedRef,
    ...restProps
  } = props
  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <div className={clsx(radio, className)} data-ui="Radio" style={style}>
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        data-error={customValidity ? '' : undefined}
        {...restProps}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        ref={ref}
        type="radio"
      />
      <span />
    </div>
  )
}
