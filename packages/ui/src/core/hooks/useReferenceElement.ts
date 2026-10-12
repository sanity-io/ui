import {useCallback, useLayoutEffect, useRef} from 'react'

import {attachRef} from '../utils/attachRef'
import {useLatestRef} from './useLatestRef'

/** The part of Floating UI's `refs` used here, whichever reference element type it was given */
interface FloatingRefs {
  floating: React.RefObject<Element | null>
  setReference: (node: HTMLElement | null) => void
}

interface ChildRefAttachment {
  detach: () => void
  node: HTMLElement
  ref: React.Ref<HTMLElement>
}

/**
 * Keeps the element of the child that `Tooltip` and `Popover` clone in a ref rather than in state.
 * A ref callback runs in the commit phase, where a state update is scheduled at Immediate priority:
 * inside a `<ViewTransition>` such an update holds up the animation, and makes React skip the
 * transition if sync work is flushed while the browser prepares it. Floating UI is handed the
 * element as the floating element mounts, or right away when it is replaced while shown.
 *
 * The child's own `ref` is attached to the element too. A change of that ref alone (an inline
 * callback ref) is applied from a layout effect, so that `setReference` keeps its identity and a
 * re-render does not detach the element from Floating UI and `onAttach`.
 *
 * @internal
 */
export function useReferenceElement(
  refs: FloatingRefs,
  childRef: React.Ref<HTMLElement> | undefined,
  onAttach?: (node: HTMLElement) => () => void,
): {
  handOverReference: () => void
  referenceRef: React.RefObject<HTMLElement | null>
  setReference: React.RefCallback<HTMLElement>
} {
  const referenceRef = useRef<HTMLElement | null>(null)
  const attachmentRef = useRef<ChildRefAttachment | null>(null)
  const childRefRef = useLatestRef(childRef)

  const setReference = useCallback(
    (node: HTMLElement) => {
      referenceRef.current = node
      if (refs.floating.current) refs.setReference(node)
      const detach = onAttach?.(node)
      syncChildRef(attachmentRef, childRefRef.current, node)

      return () => {
        syncChildRef(attachmentRef, undefined, null)
        detach?.()
        referenceRef.current = null
        if (refs.floating.current) refs.setReference(null)
      }
    },
    [childRefRef, onAttach, refs],
  )

  useLayoutEffect(() => {
    syncChildRef(attachmentRef, childRef, referenceRef.current)
  }, [childRef])

  const handOverReference = useCallback(() => {
    // Never `null`: Floating UI copies `Popover`'s `referenceElement` option into `refs.reference`
    // only when the option changes, so a `null` here would stop positioning
    if (referenceRef.current) refs.setReference(referenceRef.current)
  }, [refs])

  return {handOverReference, referenceRef, setReference}
}

/** Attaches `ref` to `node` unless it is attached already, detaching whatever else was */
function syncChildRef(
  attachmentRef: React.RefObject<ChildRefAttachment | null>,
  ref: React.Ref<HTMLElement> | undefined,
  node: HTMLElement | null,
) {
  const attachment = attachmentRef.current

  if (attachment && attachment.ref === ref && attachment.node === node) return

  attachmentRef.current = null
  attachment?.detach()

  if (ref && node) attachmentRef.current = {detach: attachRef(ref, node), node, ref}
}
