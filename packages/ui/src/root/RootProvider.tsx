import {ToastProvider} from '@sanity/ui/components/toast'
import {CardProvider} from '@sanity/ui/primitives/card'
import {LayerProvider} from '@sanity/ui/primitives/layer'
import type {CardTone, ColorScheme} from '@sanity/ui/theme'
import {BoundaryElementProvider} from '@sanity/ui/utils/boundary-element'
import {PortalProvider} from '@sanity/ui/utils/portal'
import type {ReactNode} from 'react'

/** @public */
export interface RootProviderProps {
  /**
   * The DOM element used as the boundary for detecting overflow
   * in popovers and tooltips.
   */
  boundaryElement?: HTMLElement | null
  /**
   * The application content to render within the root context.
   */
  children?: ReactNode
  /**
   * The DOM element used as the default container for portal content.
   */
  portalElement?: HTMLElement | null
  /**
   * The color scheme applied to the root and inherited by all descendants.
   */
  scheme: ColorScheme
  /**
   * The semantic color tone applied to the root card context.
   */
  tone: CardTone
}

/** @public */
export function RootProvider(props: RootProviderProps): React.JSX.Element {
  const {boundaryElement = null, children, portalElement = null, scheme, tone} = props

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
