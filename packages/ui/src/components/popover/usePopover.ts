import {createContext, useContext, useEffect, useId, useState} from 'react'

/** @public */
export interface PopoverContextValue {
  id: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

/** @public */
export function usePopoverContext(): PopoverContextValue {
  const context = useContext(PopoverContext)

  if (context === null) {
    throw new Error('Popover subcomponents must be rendered within Popover')
  }

  return context
}

/** @public */
export function usePopover(): PopoverContextValue {
  const reactId = useId()
  const id = reactId
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return {id, open, setOpen}
}
