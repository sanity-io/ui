import {ToastProvider} from '@sanity/ui/components/toast'
import {CardProvider} from '@sanity/ui/primitives/card'
import {LayerProvider} from '@sanity/ui/primitives/layer'
import type {CardTone, ColorScheme} from '@sanity/ui-tokens'
import {BoundaryElementProvider} from '@sanity/ui/utils/boundary-element'
import {PortalProvider} from '@sanity/ui/utils/portal'
import type {ReactNode} from 'react'

/** @public */
export interface RootProviderProps {
  boundaryElement: HTMLElement | null
  children?: ReactNode
  portalElement: HTMLElement | null
  scheme: ColorScheme
  tone: CardTone
}

/** @public */
export function RootProvider(props: RootProviderProps): React.JSX.Element {
  const {boundaryElement, children, portalElement, scheme, tone} = props

  return (
    <LayerProvider>
      <CardProvider root scheme={scheme} tone={tone}>
        <ToastProvider>
          <BoundaryElementProvider element={boundaryElement}>
            <PortalProvider element={portalElement}>{children}</PortalProvider>
          </BoundaryElementProvider>
        </ToastProvider>
      </CardProvider>
    </LayerProvider>
  )
}
