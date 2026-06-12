import {lazy, Suspense} from 'react'

/**
 * @public
 */
export interface ToastProps {
  closable?: boolean
  description?: React.ReactNode
  onClose: () => void
  radius?: number | number[]
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
  duration?: number
  updatedAt?: number
}

const ToastCard = lazy(() =>
  import('./toastCard').then((toastCardModule) => ({default: toastCardModule.ToastCard})),
)

/**
 * The `Toast` component gives feedback to users when an action has taken place.
 *
 * Toasts can be closed with a close button, or auto-dismiss after a certain timeout.
 *
 * The animated implementation (and the `motion` library it depends on) is loaded lazily on the
 * first render, so the toast may appear a frame later than it otherwise would.
 *
 * @public
 */
export function Toast(
  props: ToastProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      | 'as'
      | 'height'
      | 'ref'
      | 'title'
      | 'onAnimationStart'
      | 'onDragStart'
      | 'onDragEnd'
      | 'onDrag'
    >,
): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <ToastCard {...props} />
    </Suspense>
  )
}

Toast.displayName = 'Toast'
