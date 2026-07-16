import {createContext, useContext, useId, useRef, type RefObject} from 'react'

/** @public */
export interface TooltipContextValue {
  id: string
  dismissedRef: RefObject<boolean>
}

export const TooltipContext = createContext<TooltipContextValue | null>(null)

/** @public */
export function useTooltipContext(): TooltipContextValue {
  const context = useContext(TooltipContext)

  if (context === null) {
    throw new Error('Tooltip subcomponents must be rendered within Tooltip')
  }

  return context
}

/** @public */
export function useTooltip(props?: {id?: string}): TooltipContextValue {
  const reactId = useId()
  const dismissedRef = useRef(false)

  return {id: props?.id || reactId, dismissedRef}
}
