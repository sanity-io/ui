import {SpinnerIcon} from '@sanity/icons/Spinner'
import {forwardRef} from 'react'

import {Text} from '../text/text'

import {spinnerIcon} from './spinner.css'

/**
 * @public
 */
export interface SpinnerProps {
  muted?: boolean
  size?: number | number[]
}

/**
 * Indicate that something is loading for an indeterminate amount of time.
 *
 * @public
 */
export const Spinner = forwardRef(function Spinner(
  props: SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Text data-ui="Spinner" {...props} ref={ref}>
      <SpinnerIcon className={spinnerIcon} />
    </Text>
  )
})
