import {Button} from '@sanity/ui'

// ✗ Confirm is available before the reference count resolves.
export function ConfirmImmediately({onConfirm}: {onConfirm: () => void}) {
  return <Button text="Confirm" tone="critical" onClick={onConfirm} />
}

// ✓ Confirm waits for the count, and names the consequence directly. The button
// stays focusable while it is blocked: aria-disabled blocks the action, and the
// click handler does nothing until the count arrives.
export function ConfirmAfterCount({
  referenceCount,
  onConfirm,
}: {
  referenceCount: number | null
  onConfirm: () => void
}) {
  const ready = referenceCount != null

  return (
    <Button
      text={ready ? `Delete (${referenceCount} refs)` : 'Checking references…'}
      tone="critical"
      aria-disabled={!ready}
      onClick={ready ? onConfirm : undefined}
    />
  )
}
