import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import type {LayerContextValue} from './types'

export const LayerContext: Context<LayerContextValue | null> =
  createGlobalScopedContext<LayerContextValue | null>('@sanity/ui/v4/layer', null)
