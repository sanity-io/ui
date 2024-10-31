import {createGlobalScopedContext} from '../../../lib/createGlobalScopedContext'
import type {TooltipDelayGroupContextValue} from './types'

/**
 * @beta
 */
export const TooltipDelayGroupContext =
  createGlobalScopedContext<TooltipDelayGroupContextValue | null>(
    '@sanity/ui/context/tooltipDelayGroup',
    null,
  )
