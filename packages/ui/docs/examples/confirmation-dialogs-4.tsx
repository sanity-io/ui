{
  /* ✗ — no focus trap, no Escape handling, no focus return on close */
}
;<div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)'}}>
  <div style={{background: 'white', padding: 24, margin: 'auto'}}>
    <p>Delete this document?</p>
    <button onClick={onConfirm}>Delete</button>
  </div>
</div>

{
  /* ✓ — Dialog handles the backdrop, focus trap, Escape, and the close button */
}
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
