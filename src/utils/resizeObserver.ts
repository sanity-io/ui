import {ResizeObserver as ResizeObserverPolyfill} from '@juggle/resize-observer'

/**
 * @internal
 */
const RO: typeof ResizeObserver = (
  typeof window !== 'undefined' && window.ResizeObserver
    ? window.ResizeObserver
    : ResizeObserverPolyfill
) as any

export {RO as ResizeObserver}
