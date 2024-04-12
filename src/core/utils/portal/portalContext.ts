import {createGlobalScopedContext} from '../../lib/createGlobalScopedContext'
import {globalScope} from '../../lib/globalScope'
import {PortalContextValue} from './types'

const key = Symbol.for('@sanity/ui/context/portal')
const elementKey = Symbol.for('@sanity/ui/context/portal/element')

globalScope[elementKey] = null

export const defaultContextValue: PortalContextValue = {
  version: 0.0,
  boundaryElement: null,
  get element() {
    if (typeof document === 'undefined') {
      return null
    }

    if (globalScope[elementKey]) {
      return globalScope[elementKey]
    }

    globalScope[elementKey] = document.createElement('div')
    globalScope[elementKey].setAttribute('data-portal', '')

    document.body.appendChild(globalScope[elementKey])

    return globalScope[elementKey]
  },
}

export const PortalContext = createGlobalScopedContext<PortalContextValue>(key, defaultContextValue)
