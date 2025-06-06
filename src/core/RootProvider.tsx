import type {ThemeColorCardToneKey, ThemeColorSchemeKey} from '@sanity/ui/theme'
import type {ReactNode} from 'react'

import {ToastProvider} from './components/toast/toastProvider'
import {CardProvider} from './primitives/card/cardProvider'
import {LayerProvider} from './primitives/layer/layerProvider'
import {BoundaryElementProvider} from './utils/boundaryElement/boundaryElementProvider'
import {PortalProvider} from './utils/portal/portalProvider'

/** @public */
export interface RootProviderProps {
  boundaryElement?: HTMLElement | null
  children?: ReactNode
  portalElement?: HTMLElement | null
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorCardToneKey
}

/** @public */
export function RootProvider(props: RootProviderProps) {
  const {
    boundaryElement = null,
    children,
    portalElement = null,
    scheme = 'light',
    tone = 'transparent',
  } = props

  return (
    <LayerProvider>
      <CardProvider scheme={scheme} tone={tone}>
        <ToastProvider>
          <BoundaryElementProvider element={boundaryElement}>
            <PortalProvider element={portalElement}>{children}</PortalProvider>
          </BoundaryElementProvider>
        </ToastProvider>
      </CardProvider>
    </LayerProvider>
  )
}
