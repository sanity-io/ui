import {createContext, useContext, useId, useState} from 'react'

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
export function usePopover(props?: {id?: string}): PopoverContextValue {
  const reactId = useId()
  const [open, setOpen] = useState(false)

  return {id: props?.id || reactId, open, setOpen}
}
