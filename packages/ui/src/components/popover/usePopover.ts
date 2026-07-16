import {createContext, startTransition, useContext, useId, useState} from 'react'

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
  const [open, _setOpen] = useState(false)
  const setOpen: typeof _setOpen = (state) => startTransition(() => _setOpen(state))

  return {id, open, setOpen}
}
