import {Box, Text} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'

export function Paragraph(props: {children?: ReactNode}): ReactElement {
  const {children} = props

  return (
    <Box marginY={[4, 4, 5]} maxWidth={1}>
      <Text muted size={2}>
        <span>{children}</span>
      </Text>
    </Box>
  )
}
