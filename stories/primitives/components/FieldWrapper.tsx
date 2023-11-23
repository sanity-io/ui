import {ReactNode} from 'react'
import {Stack, Text} from '../../../src/core/primitives'

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
