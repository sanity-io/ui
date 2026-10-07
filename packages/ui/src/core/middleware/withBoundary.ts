import {Derivable, Middleware} from '@floating-ui/react-dom'

/** @internal */
export type ElementRef = React.RefObject<HTMLElement | null>

/**
 * Builds a middleware from derivable options that read the boundary element from a ref. Floating
 * UI evaluates them inside `computePosition`, which is when the ref is read — never during render
 * — so the middleware keeps its identity when the element changes, and with it `useFloating`'s
 * `update` callback and `autoUpdate` subscription. (As an option value the element would be
 * deep-compared by `useFloating`, which has no DOM element case: two elements are equal unless
 * their own enumerable properties differ, which for React-rendered elements means walking their
 * fibers and for plain elements never happens.) The component that owns the ref repositions when
 * the element changes.
 *
 * The other options are handed to the middleware as its `deps` as well, since `useFloating`
 * compares functions by their source: a derivable hides everything it closes over from the deep
 * compare, so without them a change would never reach the next positioning pass.
 *
 * Built at module scope on purpose: a `ref.current` read inside a callback created during render
 * makes the React Compiler skip the calling function, since it cannot tell when the callback runs.
 *
 * @internal
 */
// `const` so that string options keep their literal type, which the middleware signatures expect
export function withBoundary<const Options extends object>(
  middleware: (
    options: Derivable<Options & {boundary: HTMLElement | undefined}>,
    deps?: React.DependencyList,
  ) => Middleware,
  boundaryRef: ElementRef,
  options: Options,
): Middleware {
  return middleware(() => ({...options, boundary: boundaryRef.current || undefined}), [options])
}
