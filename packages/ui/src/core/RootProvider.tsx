import type {CardTone, ColorScheme} from '@sanity/ui/theme'
import type {ReactNode} from 'react'

import {ToastProvider} from './components/toast/ToastProvider'
import {CardProvider} from './primitives/card/CardProvider'
import {LayerProvider} from './primitives/layer/LayerProvider'
import {BoundaryElementProvider} from './utils/boundaryElement/BoundaryElementProvider'
import {PortalProvider} from './utils/portal/PortalProvider'

/** @public */
export interface RootProviderProps {
  boundaryElement?: HTMLElement | null
  children?: ReactNode
  portalElement?: HTMLElement | null
  scheme?: ColorScheme
  tone?: CardTone
}

/** @public */
export function RootProvider(props: RootProviderProps): React.JSX.Element {
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
