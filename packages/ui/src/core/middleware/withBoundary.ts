import {Derivable, Middleware} from '@floating-ui/react-dom'

import {ElementRef} from '../types/elementRef'

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
 * The options are typed by the middleware (`Options` is inferred from `create`), so a misspelled
 * or foreign option is a type error, as it is for the middleware itself.
 *
 * Built at module scope on purpose: a `ref.current` read inside a callback created during render
 * makes the React Compiler skip the calling function, since it cannot tell when the callback runs.
 *
 * @internal
 */
export function withBoundary<Options extends {boundary?: unknown}>(
  create: (options: Derivable<Options>) => Middleware,
  boundaryRef: ElementRef,
  options: Omit<Options, 'boundary'>,
): Middleware {
  const middleware = create(
    // The options with the boundary put back are `Options` by construction; TypeScript cannot
    // see through `Omit` on a type parameter to agree
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    () => ({...options, boundary: boundaryRef.current || undefined}) as Options,
  )

  return {...middleware, options: {...options, boundaryRef}}
}
