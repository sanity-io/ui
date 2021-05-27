import {SpinnerIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled, {keyframes} from 'styled-components'
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

const Root = styled(Text)`
  & > svg {
    animation: ${rotate} 500ms linear infinite;
  }
`

/**
 * @public
 */
export const Spinner = forwardRef(
  (props: SpinnerProps & Omit<React.HTMLProps<HTMLDivElement>, 'as'>, ref) => {
    return (
      <Root data-ui="Spinner" {...props} ref={ref}>
        <SpinnerIcon />
      </Root>
    )
  }
)

Spinner.displayName = 'Spinner'
