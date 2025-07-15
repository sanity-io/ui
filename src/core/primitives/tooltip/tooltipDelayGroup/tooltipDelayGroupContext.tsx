import type {Context} from 'react'

import {createGlobalScopedContext} from '../../../lib/createGlobalScopedContext'
import type {TooltipDelayGroupContextValue} from './types'

/**
 * @beta
 */
export const TooltipDelayGroupContext: Context<TooltipDelayGroupContextValue | null> =
  createGlobalScopedContext<TooltipDelayGroupContextValue | null>(
    '@sanity/ui/v3/tooltipDelayGroup',
    null,
  )
