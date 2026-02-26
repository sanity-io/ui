import {createGlobalScopedContext} from '@sanity/ui/core'
import type {Context} from 'react'

import type {ToastContextValue} from './types'

export const ToastContext: Context<ToastContextValue | null> =
  createGlobalScopedContext<ToastContextValue | null>('@sanity/ui/v4/toast', null)
