import {AnimatePresence} from 'motion/react'

import {ToastCard} from './toastCard'
import type {ToastParams} from './types'

/**
 * @internal
 */
export type ToastState = {
  dismiss: () => void
  id: string
  updatedAt: number
  params: ToastParams
}[]

/**
 * Renders the animated toast stack. Kept in a separate module so that `motion/react` is only
 * loaded once the first toast is pushed.
 *
 * @internal
 */
export function ToastList(props: {toasts: ToastState}): React.JSX.Element {
  const {toasts} = props

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {toasts.map(({dismiss, id, params, updatedAt}) => (
        <ToastCard
          key={id}
          closable={params.closable}
          description={params.description}
          onClose={dismiss}
          status={params.status}
          title={params.title}
          duration={params.duration}
          updatedAt={updatedAt}
        />
      ))}
    </AnimatePresence>
  )
}

ToastList.displayName = 'ToastList'
