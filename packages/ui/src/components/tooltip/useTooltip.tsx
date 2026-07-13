import {createContext, useContext, useEffect, useId, useState} from 'react'

/** @public */
export interface TooltipContextValue {
  id: string
  dismissed: boolean
  setDismissed: (dismissed: boolean) => void
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
export function useTooltip(): TooltipContextValue {
  const reactId = useId()
  const id = reactId
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDismissed(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dismissed])

  return {id, dismissed, setDismissed}
}
