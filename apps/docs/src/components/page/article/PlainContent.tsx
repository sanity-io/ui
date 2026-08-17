'use client'

import {Text} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

const Root = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

/** Wrapper for simple prose (callouts, property descriptions) */
export function PlainContent(props: {children?: ReactNode}): ReactElement {
  return <Root data-ui="PlainContent">{props.children}</Root>
}

export function PlainParagraph(props: {children?: ReactNode}): ReactElement {
  return <Text muted>{props.children}</Text>
}
