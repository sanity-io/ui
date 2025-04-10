import {composeClassNames, radio} from '@sanity/ui/css'
import {ForwardedRef, forwardRef, useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks'
import {Props} from '../../types'

/**
 * @public
 */
export interface RadioProps {
  customValidity?: string
}

/**
 * The `Radio` component allows the user to select one option from a set.
 *
 * @public
 */
export const Radio = forwardRef(function Radio(
  props: Props<RadioProps, 'input'>,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) {
  const {className, disabled, style, customValidity, readOnly, ...restProps} = props
  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <div className={composeClassNames(className, radio())} data-ui="Radio" style={style}>
      <input
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
})

Radio.displayName = 'ForwardRef(Radio)'
