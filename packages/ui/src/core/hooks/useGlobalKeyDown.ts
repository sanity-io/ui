import {useEffect, useInsertionEffect, useRef} from 'react'

/**
 * Adds global keydown event listener to the window.
 *
 * @param onKeyDown - The function to call when a keydown event is triggered.
 * @param options - The options to pass to the addEventListener function (example, capture: true)
 * @beta
 */
export function useGlobalKeyDown(
  onKeyDown: (event: KeyboardEvent) => void,
  options?: AddEventListenerOptions,
): void {
  // The ref lets the `keydown` listener call the latest `onKeyDown` without
  // re-subscribing on every render — the `useEffectEvent` pattern, inlined from
  // https://github.com/sanity-io/use-effect-event/blob/v1.0.2/src/useEffectEvent.ts
  // TODO: switch to `useEffectEvent` from `react` once
  // https://github.com/facebook/react/issues/34818 is fixed in the lowest React
  // version we support: on React 19.2 the native hook never sees values past
  // the first render when the calling component is wrapped in `forwardRef` or
  // `memo`. This public hook runs in the fiber of whatever component calls it
  // (consumers may call it from `forwardRef` or `memo` components).
  const onKeyDownRef = useRef(onKeyDown)
  useInsertionEffect(() => {
    onKeyDownRef.current = onKeyDown
  })

  useEffect(() => {
    const handler = (event: KeyboardEvent) => onKeyDownRef.current(event)

    window.addEventListener('keydown', handler, options)

    return () => window.removeEventListener('keydown', handler, options)
  }, [options])
}
