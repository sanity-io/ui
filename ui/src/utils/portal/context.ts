import {createContext} from 'react'

export interface PortalContextInterface {
  element: HTMLElement
}

let globalElement: HTMLDivElement | null = null

export const defaultContextValue = {
  get element() {
    if (globalElement) return globalElement

    globalElement = document.createElement('div')
    globalElement.setAttribute('data-portal', '')
    document.body.appendChild(globalElement)

    return globalElement
  },
}

export const PortalContext = createContext<PortalContextInterface>(defaultContextValue)
