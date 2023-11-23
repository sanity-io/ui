import {createContext} from 'react'
import {globalScope} from '../../../lib/globalScope'
import {TooltipDelayGroupContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/tooltipDelayGroup')

globalScope[key] = globalScope[key] || createContext<TooltipDelayGroupContextValue | null>(null)

/**
 * @beta
 */
export const TooltipDelayGroupContext: React.Context<TooltipDelayGroupContextValue | null> =
  globalScope[key]
