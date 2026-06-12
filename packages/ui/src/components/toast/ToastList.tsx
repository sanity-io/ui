import {AnimatePresence} from 'motion/react'

import {ToastCard} from './ToastCard'
import type {ToastParams} from './types'

/** @internal */
export type ToastState = {
  dismiss: () => void
  id: string
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
      {toasts.map(({dismiss, id, params}) => (
        <ToastCard
          key={id}
          closable={params.closable}
          description={params.description}
          duration={params.duration}
          status={params.status}
          title={params.title}
          onClose={dismiss}
        />
      ))}
    </AnimatePresence>
  )
}

ToastList.displayName = 'ToastList'
