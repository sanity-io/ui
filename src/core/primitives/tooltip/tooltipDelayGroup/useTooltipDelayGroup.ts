import {use} from 'react'

import {TooltipDelayGroupContext} from './TooltipDelayGroupContext'
import type {TooltipDelayGroupContextValue} from './types'

/**
 * @beta
 */
export function useTooltipDelayGroup(): TooltipDelayGroupContextValue | null {
  const value = use(TooltipDelayGroupContext)

  return value
}
