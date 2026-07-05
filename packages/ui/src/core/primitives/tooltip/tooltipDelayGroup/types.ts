/**
 * @beta
 */
export interface TooltipDelayGroupContextValue {
  // oxlint-disable-next-line no-duplicate-type-constituents
  setIsGroupActive: (nextState: React.SetStateAction<boolean>, delay?: number | undefined) => void
  // oxlint-disable-next-line no-duplicate-type-constituents
  setOpenTooltipId: (nextId: string | null, delay?: number | undefined) => void
  openDelay: number
  closeDelay: number
  openTooltipId: string | null
}
