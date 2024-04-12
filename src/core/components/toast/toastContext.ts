import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {ToastContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/toast')

export const ToastContext = createGlobalScopedContext<ToastContextValue | null>(key, null)
