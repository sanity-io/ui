import {type RadiusStyleProps} from '@sanity/ui-css'
import {lazy, type ReactNode, Suspense} from 'react'

import type {ComponentType, Props} from '../../core/types'

/** @internal */
export const DEFAULT_TOAST_ELEMENT = 'li'

/** @internal */
export type ToastOwnProps = RadiusStyleProps & {
  closable?: boolean
  description?: ReactNode
  onClose?: () => void
  title?: ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
}

/** @internal */
export type ToastElementType = 'li' | ComponentType

/** @internal */
export type ToastProps<E extends ToastElementType = ToastElementType> = Props<ToastOwnProps, E>

const ToastCard = lazy(() =>
  import('./ToastCard').then((toastCardModule) => ({default: toastCardModule.ToastCard})),
)

/**
 * The `Toast` component gives feedback to users when an action has taken place.
 *
 * Toasts can be closed with a close button, or auto-dismiss when the duration expires.
 *
 * The animated implementation (and the `motion` library it depends on) is loaded lazily on the
 * first render, so the toast may appear a frame later than it otherwise would.
 *
 * @internal
 */
export function Toast<E extends ToastElementType = typeof DEFAULT_TOAST_ELEMENT>(
  props: ToastProps<E>,
): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <ToastCard {...(props as ToastProps<typeof DEFAULT_TOAST_ELEMENT>)} />
    </Suspense>
  )
}
