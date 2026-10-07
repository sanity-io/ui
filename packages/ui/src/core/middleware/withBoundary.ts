/** @internal */
export type ElementRef = React.RefObject<HTMLElement | null>

/**
 * Derivable middleware options that read the boundary element from a ref. Floating UI evaluates
 * them inside `computePosition`, which is when the ref is read — never during render — so the
 * middleware keeps its identity when the element changes, and with it `useFloating`'s `update`
 * callback and `autoUpdate` subscription. (As an option value the element would be deep-compared
 * by `useFloating`, which has no DOM element case: two elements are equal unless their own
 * enumerable properties differ, which for React-rendered elements means walking their fibers and
 * for plain elements never happens.) The component that owns the ref repositions when the element
 * changes.
 *
 * Built at module scope on purpose: a `ref.current` read inside a callback created during render
 * makes the React Compiler skip the calling function, since it cannot tell when the callback runs.
 *
 * @internal
 */
export function withBoundary<Options extends object>(
  boundaryRef: ElementRef,
  options: Options,
): () => Options & {boundary: HTMLElement | undefined} {
  return () => ({...options, boundary: boundaryRef.current || undefined})
}
