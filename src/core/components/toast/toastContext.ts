import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {ToastContextValue} from './types'

export const ToastContext: Context<ToastContextValue | null> =
  createGlobalScopedContext<ToastContextValue | null>('@sanity/ui/v3/toast', null)
