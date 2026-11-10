import {Flex, Spinner, Text} from '@sanity/ui'

// Spinner already renders role="status" and aria-label="Loading...", which is generic.
// Pair it with a visible label that says what is loading, and put both in one
// role="status" container so the message is announced once. The Spinner is hidden from
// AT here because the visible text already carries the message.
export function LoadingState() {
  return (
    <Flex role="status" alignItems="center" justifyContent="center" gap={2} padding={4}>
      <Spinner size={2} aria-hidden="true" />
      <Text size={1}>Loading documents…</Text>
    </Flex>
  )
}
