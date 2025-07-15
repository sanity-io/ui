import type {Context} from 'react'

import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {globalScope} from '../../lib/globalScope'
import type {PortalContextValue} from './types'

const key = '@sanity/ui/v3/portal'
const elementKey = Symbol.for(`${key}/element`)

// Use the global scope as a map of symbols to elements
const elementMap = globalScope as Record<symbol, HTMLDivElement | null>

elementMap[elementKey] = null

export const defaultContextValue: PortalContextValue = {
  version: 0.0,
  boundaryElement: null,
  get element() {
    if (typeof document === 'undefined') {
      return null
    }

    if (elementMap[elementKey]) {
      return elementMap[elementKey]
    }

    elementMap[elementKey] = document.createElement('div')
    elementMap[elementKey].setAttribute('data-portal', '')

    document.body.appendChild(elementMap[elementKey])

    return elementMap[elementKey]
  },
}

export const PortalContext: Context<PortalContextValue> =
  createGlobalScopedContext<PortalContextValue>(key, defaultContextValue)
