import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {ToastContextValue} from './types'

export const ToastContext = createGlobalScopedContext<ToastContextValue | null>(
  '@sanity/ui/context/toast',
  null,
)
