import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import type {PopoverContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/popover')

globalScope[key] = globalScope[key] || createContext<PopoverContextValue | null>(null)

export const PopoverContext: React.Context<PopoverContextValue | null> = globalScope[key]
