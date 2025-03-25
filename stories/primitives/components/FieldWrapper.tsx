import {ReactNode} from 'react'
import { Stack } from '../../../src/core/primitives/stack/stack'
import { Text } from '../../../src/core/primitives/text/text'

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
