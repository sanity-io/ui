import {Button, Flex, Text} from '@sanity/ui'

// UI v5 uses full CSS prop names: flexDirection / alignItems / justifyContent.
export function Row() {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={2}>
      <Text size={1}>Title</Text>
      <Button text="Action" tone="neutral" />
    </Flex>
  )
}
