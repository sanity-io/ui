/**
 * @beta
 */
export interface TooltipDelayGroupContextValue {
  setIsGroupActive: (nextState: React.SetStateAction<boolean>, delay?: number | undefined) => void
  setOpenTooltipId: (nextId: string | null, delay?: number | undefined) => void
  openDelay: number
  closeDelay: number
  openTooltipId: string | null
}
