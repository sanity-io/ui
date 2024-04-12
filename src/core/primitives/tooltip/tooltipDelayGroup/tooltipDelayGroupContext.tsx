import {createGlobalScopedContext} from '../../../lib/createGlobalScopedContext'
import {TooltipDelayGroupContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/tooltipDelayGroup')

/**
 * @beta
 */
export const TooltipDelayGroupContext =
  createGlobalScopedContext<TooltipDelayGroupContextValue | null>(key, null)
