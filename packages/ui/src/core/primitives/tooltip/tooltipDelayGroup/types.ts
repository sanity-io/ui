/**
 * @beta
 */
export interface TooltipDelayGroupContextValue {
  handleOpenChange: (params: {open: boolean; id: string; immediate?: boolean}) => void
  visibleTooltipId: string | undefined
}
