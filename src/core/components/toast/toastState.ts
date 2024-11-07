let toastId = 0

/** @internal */
export function generateToastId(): string {
  return String(toastId++)
}
