import {SpinnerIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled, {keyframes} from 'styled-components'
import {Text} from '../text'

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

export const Spinner = forwardRef(
  (
    props: {muted?: boolean; size?: number | number[]} & Omit<
      React.HTMLProps<HTMLDivElement>,
      'as'
    >,
    ref
  ) => {
    return (
      <Root {...props} ref={ref}>
        <SpinnerIcon />
      </Root>
    )
  }
)

Spinner.displayName = 'Spinner'
