import {createContext} from 'react'
import {globalScope} from '../../lib/globalScope'
import {ToastParams} from './types'

export interface ToastContextValue {
  version: 0.0
  push: (params: ToastParams) => string
}

const key = Symbol.for('@sanity/ui/context/toast')

globalScope[key] = globalScope[key] || createContext<ToastContextValue | null>(null)

export const ToastContext: React.Context<ToastContextValue | null> = globalScope[key]
