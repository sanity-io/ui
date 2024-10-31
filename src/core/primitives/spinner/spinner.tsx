import {ResponsiveProp, spinner} from '@sanity/ui/css'
import {FontTextSize} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {Text} from '../text'
import {AnimatedSpinnerIcon} from './animatedSpinnerIcon'

/**
 * @public
 */
export interface SpinnerProps {
  muted?: boolean
  size?: ResponsiveProp<FontTextSize>
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
    <Text data-ui="Spinner" {...props} className={spinner()} ref={ref}>
      <AnimatedSpinnerIcon />
    </Text>
  )
})

Spinner.displayName = 'ForwardRef(Spinner)'
