import {
  autoUpdate,
  type ReferenceType,
  useFloating as useFloatingUI,
  type UseFloatingOptions,
  type UseFloatingReturn,
} from '@floating-ui/react-dom'
import {useCallback, useMemo} from 'react'

/**
 * Calls `update` right away, or once the active view transition has started animating.
 *
 * `@floating-ui/react-dom` commits every position update with `flushSync()`, and React skips a
 * `<ViewTransition>` animation that is still preparing when something renders synchronously.
 * React handles the transition's `ready` promise before this does, so by the time `update` runs a
 * synchronous render no longer cancels the animation.
 */
function afterViewTransitionReady(update: () => void): void {
  const transition = document.activeViewTransition

  if (transition) {
    transition.ready.then(update, update)
  } else {
    update()
  }
}

function whileElementsMounted(
  reference: ReferenceType,
  floating: HTMLElement,
  update: () => void,
): () => void {
  return autoUpdate(reference, floating, () => afterViewTransitionReady(update))
}

/**
 * `useFloating()` from `@floating-ui/react-dom`, kept in position with `autoUpdate`, whose position
 * updates don't cancel view transitions
 *
 * @internal
 */
export function useFloating(
  options: Omit<UseFloatingOptions, 'whileElementsMounted'>,
): UseFloatingReturn {
  const floating = useFloatingUI({...options, whileElementsMounted})
  const {update: updateNow} = floating
  const update = useCallback(() => afterViewTransitionReady(updateNow), [updateNow])

  return useMemo(() => ({...floating, update}), [floating, update])
}
