import color from '@sanity/color'
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  background: ${color.gray['200'].hex};
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const withCentered = (storyFn: () => JSX.Element) => <Root>{storyFn()}</Root>
