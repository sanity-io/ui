import {ResponsiveProp, spinner} from '@sanity/ui/css'
import {FontTextSize} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'
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
  props: Props<SpinnerProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Text data-ui="Spinner" {...props} className={spinner()} ref={ref}>
      <AnimatedSpinnerIcon />
    </Text>
  )
})

Spinner.displayName = 'ForwardRef(Spinner)'
