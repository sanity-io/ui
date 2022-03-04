import {createContext} from 'react'
import {PropSchema} from './types'

export interface PropsContextValue {
  registerProp: (propSchema: PropSchema) => void
  schemas: PropSchema[]
  setPropValue: (propName: string, value: unknown) => void
  unregisterProp: (propName: string) => void
  value: Record<string, unknown>
}

export const PropsContext = createContext<PropsContextValue | null>(null)
