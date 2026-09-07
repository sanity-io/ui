'use client'

import {Box, Text} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'
import {styled} from 'styled-components'

const BulletListBox = styled(Box)`
  & > li [data-ui='Text'] > span:before {
    position: absolute;
    content: '•';
    width: 1em;
    margin-left: -1.5em;
    text-align: right;
  }
`

export function BulletList(props: {children?: ReactNode}): ReactElement {
  return (
    <BulletListBox forwardedAs="ul" marginY={[4, 4, 5]} paddingLeft={5}>
      {props.children}
    </BulletListBox>
  )
}

export function ListItem(props: {children?: ReactNode}): ReactElement {
  return (
    <Box as="li" marginY={[3, 3, 4]}>
      <Text muted size={[2, 2, 3]}>
        {props.children}
      </Text>
    </Box>
  )
}
