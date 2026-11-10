import {Button, Dialog, Flex, Text} from '@sanity/ui'

;<Dialog header="Delete document?" open={open} onClose={onCancel}>
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
