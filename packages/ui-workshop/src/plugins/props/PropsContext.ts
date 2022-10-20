import {createContext} from 'react'
import {PropSchema} from './types'

/** @internal */
export interface PropsContextValue {
  registerProp: (propSchema: PropSchema) => void
  schemas: PropSchema[]
  setPropValue: (propName: string, value: unknown) => void
  unregisterProp: (propName: string) => void
  value: Record<string, unknown>
}

/** @internal */
export const PropsContext = createContext<PropsContextValue | null>(null)
