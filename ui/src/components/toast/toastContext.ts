import {createContext} from 'react'
import {ToastParams} from './types'

export interface ToastContextValue {
  push: (params: ToastParams) => string
}

export const ToastContext = createContext<ToastContextValue | null>(null)
