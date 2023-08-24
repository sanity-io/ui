/**
 * @beta
 */
export interface TooltipDelayGroupContextValue {
  isGroupActive: boolean
  setIsGroupActive: (nextState: React.SetStateAction<boolean>, delay?: number | undefined) => void
  openDelay: number
  closeDelay: number
}
