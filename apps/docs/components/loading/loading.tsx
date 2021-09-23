import {Spinner} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled.div<{$loading: boolean}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 150ms opacity;
  opacity: ${({$loading}) => ($loading ? 1 : 0)};
  pointer-events: ${({$loading}) => ($loading ? undefined : 'none')};

  &:before {
    content: '';
    display: block;
    background-color: var(--card-bg-color);
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  & > div {
    position: relative;
  }
`

export function Loading(
  props: {loading: boolean} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>
) {
  const {loading, ...restProps} = props

  return (
    <Root {...restProps} $loading={loading}>
      <Spinner muted />
    </Root>
  )
}
