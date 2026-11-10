{
  /* ✗ — confirm is available before the reference count resolves */
}
;<Button text="Confirm" tone="critical" onClick={onConfirm} />

{
  /* ✓ — confirm waits for the count, and names the consequence directly */
}
;<Button
  text={referenceCount == null ? 'Checking references…' : `Delete (${referenceCount} refs)`}
  tone="critical"
  disabled={referenceCount == null}
  onClick={onConfirm}
/>
