import {Middleware} from '@floating-ui/react-dom'

/** @internal */
export type ElementRef = React.RefObject<HTMLElement | null>

/**
 * Creates a Floating UI middleware (`flip`, `shift`, `hide`, …) from `options` plus a `boundary`
 * read from a ref. The boundary is read at positioning time: the middleware receives derivable
 * options, which Floating UI evaluates inside `computePosition`, never during render, so the
 * middleware keeps its identity when the element changes — and with it `useFloating`'s `update`
 * callback and `autoUpdate` subscription. As an option value the element would be deep-compared
 * by `useFloating`, which has no DOM element case (two elements are equal unless their own
 * enumerable properties differ, which for React-rendered elements means walking their fibers and
 * for plain elements never happens). The component that owns the ref repositions when the element
 * changes.
 *
 * `useFloating` tells a changed middleware from an unchanged one by its `options` property,
 * comparing functions by their source text, so derivable options would hide every value in their
 * closure as well. The middleware's `fn` evaluates the options it was created with, and the
 * `options` property is only that metadata, so the returned middleware exposes the plain options
 * with the ref standing in for the element: a changed `fallbackPlacements` or `padding` is seen,
 * a changed element (same ref) is not.
 *
 * Built at module scope on purpose: a `ref.current` read inside a callback created during render
 * makes the React Compiler skip the calling function, since it cannot tell when the callback runs.
 *
 * @internal
 */
export function withBoundary<const Options extends object>(
  create: (options: () => Options & {boundary: HTMLElement | undefined}) => Middleware,
  boundaryRef: ElementRef,
  options: Options,
): Middleware {
  const middleware = create(() => ({...options, boundary: boundaryRef.current || undefined}))

  return {...middleware, options: {...options, boundaryRef}}
}
