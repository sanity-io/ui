/**
 * @public
 */
export interface PopoverContextValue {
  version: number
  forceUpdate: () => void
  lastUpdateId: string | null
}
