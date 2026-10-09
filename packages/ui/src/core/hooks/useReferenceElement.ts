import {useCallback, useLayoutEffect, useRef} from 'react'

import {attachRef} from '../utils/attachRef'
import {useLatestRef} from './useLatestRef'

/**
 * The part of Floating UI's `refs` that the referred element goes through. Structural, since
 * `Tooltip` and `Popover` call `useFloating` with different reference types.
 */
interface FloatingReferenceRefs {
  floating: React.RefObject<Element | null>
  setReference: (node: HTMLElement | null) => void
}

/** @internal */
export interface UseReferenceElementOptions {
  /** The ref the consumer put on the child we clone, attached to the element alongside ours */
  childRef: React.Ref<HTMLElement> | undefined
  /**
   * Runs as the element attaches and returns what to run as it detaches (`Popover` listens to
   * the element for intent). Memoized by the caller: `setReference` is stable as long as it is.
   */
  onAttach?: (node: HTMLElement) => () => void
  refs: FloatingReferenceRefs
}

/** @internal */
export interface ReferenceElement {
  /** Hands the element to Floating UI: for the ref callback of the floating element, as it mounts */
  handOverReference: () => void
  /** The referred element while it is mounted and shown, `null` otherwise */
  referenceRef: React.RefObject<HTMLElement | null>
  /**
   * The ref callback for the cloned child, stable for the lifetime of the component. It returns a
   * cleanup, so React never calls it with `null` (React 19); the type states the contract it is
   * used under, a `ref` prop.
   */
  setReference: React.RefCallback<HTMLElement>
}

/** The consumer's ref attached to the referred element, and the function that detaches it */
interface ChildRefAttachment {
  detach: () => void
  node: HTMLElement
  ref: React.Ref<HTMLElement>
}

interface ReferenceCallbackOptions {
  attachmentRef: React.RefObject<ChildRefAttachment | null>
  childRefRef: React.RefObject<React.Ref<HTMLElement> | undefined>
  onAttach: ((node: HTMLElement) => () => void) | undefined
  referenceRef: React.RefObject<HTMLElement | null>
  refs: FloatingReferenceRefs
}

/**
 * The element a `Tooltip` or `Popover` is attached to: the child it clones, whose ref callback
 * this hook provides (`setReference`).
 *
 * The element lives in a ref, which nothing reads during render. Floating UI, which has nothing to
 * position until the overlay shows, is handed the element as the floating card mounts
 * (`handOverReference`, from the card's ref callback), so the update Floating UI schedules for it
 * rides along with the one for the card, in the commit that shows the overlay; while the card is
 * mounted, a replaced element is handed over right away. The alternative, setting the element
 * into state from the ref callback, schedules an update at Immediate priority in the commit that
 * attaches the ref — on mount, on unmount, and each time an `<Activity>` hides or shows the
 * element — which React commits as soon as a view transition revealing or hiding the element is
 * ready to animate, delaying its first frame, and which makes React cancel that transition should
 * anything flush sync work while the browser is still preparing it (a `flushSync`, React restoring
 * a controlled input). A transition update instead would land only once that transition has
 * finished, and would itself be an update for any `<ViewTransition>` around the component to
 * snapshot and animate. See `apps/storybook/tests/viewTransitionReveal.test.tsx`.
 *
 * The consumer's own ref on the child is attached to the element as well, with React's semantics
 * for a `ref` prop: from the commit that mounts the element on (the ref callback attaches it, and
 * a layout effect swaps it when its identity changes), detached and attached again when the
 * element is replaced, and detached and attached around an `<Activity>` hiding and showing it. A
 * changed ref identity — an inline `ref={(el) => …}` on the child, a new one every render — does
 * not reach Floating UI, `onAttach`, or the ref callback itself: that stays stable, so React never
 * detaches and attaches it for a re-render of the parent.
 *
 * A hook, with the ref accesses in module-scope functions: the React Compiler takes a callback
 * that accesses refs for a possible read during render wherever it flows into a plain call —
 * `cloneElement` in `Tooltip` and `Popover` — and would skip the component, since it cannot tell
 * when the callback runs. The result of a hook call carries no such mark.
 *
 * @internal
 */
export function useReferenceElement(options: UseReferenceElementOptions): ReferenceElement {
  const {childRef, onAttach, refs} = options
  const referenceRef = useRef<HTMLElement | null>(null)
  const attachmentRef = useRef<ChildRefAttachment | null>(null)
  const childRefRef = useLatestRef(childRef)

  const setReference = useCallback(
    (node: HTMLElement) =>
      attachReference(node, {attachmentRef, childRefRef, onAttach, referenceRef, refs}),
    [attachmentRef, childRefRef, onAttach, referenceRef, refs],
  )

  // A new consumer ref (identity) is attached to the element in the same commit, after the ref
  // callback above attached the element itself, and the one it replaces is detached
  useLayoutEffect(() => {
    syncChildRef(attachmentRef, childRef, referenceRef.current)
  }, [attachmentRef, childRef, referenceRef])

  const handOverReference = useCallback(() => handOver(refs, referenceRef), [refs, referenceRef])

  return {handOverReference, referenceRef, setReference}
}

function attachReference(
  node: HTMLElement,
  {attachmentRef, childRefRef, onAttach, referenceRef, refs}: ReferenceCallbackOptions,
): () => void {
  referenceRef.current = node
  updateReferenceWhileFloating(refs, node)

  const detach = onAttach?.(node)

  syncChildRef(attachmentRef, childRefRef.current, node)

  return () => {
    syncChildRef(attachmentRef, childRefRef.current, null)
    detach?.()
    referenceRef.current = null
    updateReferenceWhileFloating(refs, null)
  }
}

/**
 * Attaches `ref` to `node` unless that is what is attached already, detaching whatever else was.
 * With no `ref` or no `node`, detaches only.
 */
function syncChildRef(
  attachmentRef: React.RefObject<ChildRefAttachment | null>,
  ref: React.Ref<HTMLElement> | undefined,
  node: HTMLElement | null,
): void {
  const attachment = attachmentRef.current

  if (attachment && attachment.ref === ref && attachment.node === node) return

  if (attachment) {
    attachmentRef.current = null
    attachment.detach()
  }

  if (ref && node) {
    attachmentRef.current = {detach: attachRef(ref, node), node, ref}
  }
}

/**
 * Only with an element of our own. Floating UI copies an `elements.reference` option (`Popover`
 * passes its `referenceElement` prop as one) into `refs.reference` from a layout effect keyed on
 * that option, and a `setReference(null)` here would overwrite the copy: the option is unchanged,
 * so the effect never runs again to restore it, and positioning stops (`update` returns early
 * without a reference) until the floating element or the middleware change.
 */
function handOver(refs: FloatingReferenceRefs, referenceRef: React.RefObject<HTMLElement | null>) {
  if (referenceRef.current) refs.setReference(referenceRef.current)
}

/**
 * Keeps Floating UI's reference current while there is a floating element: an element replaced
 * (or removed) while the overlay shows repositions it right away. Floating UI ignores a node that
 * is its reference already, so the same element attaching again (an `<Activity>` showing it) is
 * free.
 */
function updateReferenceWhileFloating(refs: FloatingReferenceRefs, node: HTMLElement | null): void {
  if (refs.floating.current) refs.setReference(node)
}
