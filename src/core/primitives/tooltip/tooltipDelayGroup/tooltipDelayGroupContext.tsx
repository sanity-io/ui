import {createGlobalScopedContext} from '../../../lib/createGlobalScopedContext'
import {TooltipDelayGroupContextValue} from './types'

/**
 * @beta
 */
export const TooltipDelayGroupContext =
  createGlobalScopedContext<TooltipDelayGroupContextValue | null>(
    '@sanity/ui/context/tooltipDelayGroup',
    null,
  )
