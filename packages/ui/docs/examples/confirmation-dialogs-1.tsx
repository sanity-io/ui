import {Button, Dialog, Flex, Text} from '@sanity/ui'

// A confirmation as a Dialog. A Dialog is a gating decision: it blocks the page until
// the user chooses.
export function DeleteDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog header="Delete document?" open={open} onClose={onCancel}>
      <Dialog.Content>
        <Text>This can't be undone.</Text>
      </Dialog.Content>
      <Dialog.Footer>
        <Flex gap={3} justifyContent="flex-end">
          <Button text="Cancel" level="secondary" onClick={onCancel} />
          <Button text="Delete" tone="critical" onClick={onConfirm} />
        </Flex>
      </Dialog.Footer>
    </Dialog>
  )
}
