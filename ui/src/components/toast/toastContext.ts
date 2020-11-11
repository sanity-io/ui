import {createContext} from 'react'
import {ToastParams} from './types'

export interface ToastContextValue {
  push: (params: ToastParams) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
