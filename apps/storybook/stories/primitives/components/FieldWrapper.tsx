import {Stack, Text} from '@sanity/ui'
import {ReactNode} from 'react'

export const FieldWrapper = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}): ReactNode => {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {children}
    </Stack>
  )
}
