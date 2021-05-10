import {createContext} from 'react'
import {WorkshopContextValue} from './types'

export const WorkshopContext = createContext<WorkshopContextValue | null>(null)
