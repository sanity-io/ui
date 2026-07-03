import {useContext} from 'react'

import {TooltipDelayGroupContext} from './tooltipDelayGroupContext'
import {TooltipDelayGroupContextValue} from './types'

/**
 * @beta
 */
export function useTooltipDelayGroup(): TooltipDelayGroupContextValue | null {
  const value = useContext(TooltipDelayGroupContext)

  return value
}
