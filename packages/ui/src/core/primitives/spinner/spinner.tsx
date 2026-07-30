import {SpinnerIcon} from '@sanity/icons/Spinner'

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
export const Spinner = function Spinner(
  props: SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
) {
  return (
    <Text data-ui="Spinner" {...props}>
      <SpinnerIcon className={spinnerIcon} />
    </Text>
  )
}
