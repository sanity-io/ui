import {Flex, Spinner, Text} from '@sanity/ui'

// Size the spinner down and align it inline with a visible label. The label is the
// announcement, so the wrapper is the role="status" region and the Spinner is hidden.
export function SavingIndicator() {
  return (
    <Flex role="status" alignItems="center" gap={2}>
      <Spinner size={1} aria-hidden="true" />
      <Text size={1}>Saving…</Text>
    </Flex>
  )
}
