import {Stack, Text} from '@sanity/ui'
import type {ReactNode} from 'react'

export const FieldWrapper = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}): ReactNode => {
  return (
    <Stack gap={3}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {children}
    </Stack>
  )
}
