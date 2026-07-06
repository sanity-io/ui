import {SpinnerIcon} from '@sanity/icons'
import {forwardRef} from 'react'
import {keyframes, styled} from 'styled-components'

import {Text} from '../text'

/**
 * @public
 */
export interface SpinnerProps {
  muted?: boolean
  size?: number | number[]
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled(Text)`
  & > span > svg {
    animation: ${rotate} 500ms linear infinite;
  }
`

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
    <StyledSpinner data-ui="Spinner" {...props} ref={ref}>
      <SpinnerIcon />
    </StyledSpinner>
  )
})
Spinner.displayName = 'ForwardRef(Spinner)'
