import {ResizeObserver as ResizeObserverPolyfill} from '@juggle/resize-observer'

/**
 * @internal
 */
export const _ResizeObserver: typeof ResizeObserver =
  typeof document !== 'undefined' && typeof window !== 'undefined' && window.ResizeObserver
    ? window.ResizeObserver
    : ResizeObserverPolyfill
