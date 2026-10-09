import {detectOverflow, Middleware} from '@floating-ui/react-dom'

import {ElementRef} from '../../../types/elementRef'
import {PopoverMargins} from '../../../types/popover'

interface SizeOptions {
  /** The boundary element to fit within, read on every positioning pass (see `withBoundary`) */
  boundaryRef: ElementRef
  constrainSize: boolean
  margins: PopoverMargins
  matchReferenceWidth?: boolean
  /**
   * The width cap from the `width` property and the boundary width (`calcMaxWidth`), read on
   * every positioning pass while `constrainSize` is set. A ref rather than a value, so that a
   * change of the cap does not recreate the middleware (see `Popover`).
   */
  maxWidthRef: React.RefObject<number | undefined>
  padding?: number
}

/**
 * Sizes the floating element inside the positioning pass: `matchReferenceWidth` gives it the
 * reference element's width, and `constrainSize` caps its width and height to the room within the
 * boundary. The styles are written straight to the element — before its dimensions are read back,
 * so that a changed size restarts the pass — and only these: whatever this middleware does not
 * own (`width` without `matchReferenceWidth`, `maxWidth` and `maxHeight` without `constrainSize`)
 * is rendered by React on the card instead, as a value or as `''`, so every style property has
 * exactly one writer and React clears a write of this middleware once the property is its own
 * again (see `Popover`).
 */
export function size(options: SizeOptions): Middleware {
  const {
    boundaryRef,
    constrainSize,
    margins,
    matchReferenceWidth,
    maxWidthRef,
    padding = 0,
  } = options

  return {
    name: '@sanity/ui/size',
    // `useFloating` tells a changed middleware array from an unchanged one by comparing the arrays
    // deeply, functions by their source, so a middleware that keeps its inputs to itself can never
    // change in its eyes. Exposing them the way Floating UI's own middleware do makes a change of
    // `constrainSize`, `matchReferenceWidth` or the margins reach the next pass. (The two refs are
    // the same objects on every render, so their values changing does not count as a change — on
    // purpose: the popover repositions itself for those, see `Popover`.)
    options,
    async fn(args) {
      const {elements, placement, platform, rects} = args
      const {floating, reference} = rects

      const floatingW = floating.width
      const floatingH = floating.height

      // IMPORTANT – APPLY ELEMENT STYLES HERE
      // Elements need to be resized BEFORE the `platform.getDimensions` call below
      if (matchReferenceWidth) {
        elements.floating.style.width = px(reference.width - margins[1] - margins[3])
      }

      // The room within the boundary is only measured when it is applied: `detectOverflow` walks
      // the clipping ancestors on every pass otherwise, for nothing
      if (constrainSize) {
        const overflow = await detectOverflow(args, {
          altBoundary: true,
          boundary: boundaryRef.current || undefined,
          elementContext: 'floating',
          padding,
          rootBoundary: 'viewport',
        })

        let maxWidth = Infinity
        let maxHeight = Infinity

        if (placement.includes('top')) {
          maxWidth = floatingW - (overflow.left + overflow.right)
          maxHeight = floatingH - overflow.top
        }

        if (placement.includes('right')) {
          maxWidth = floatingW - overflow.right
          maxHeight = floatingH - (overflow.top + overflow.bottom)
        }

        if (placement.includes('bottom')) {
          maxWidth = floatingW - (overflow.left + overflow.right)
          maxHeight = floatingH - overflow.bottom
        }

        if (placement.includes('left')) {
          maxWidth = floatingW - overflow.left
          maxHeight = floatingH - (overflow.top + overflow.bottom)
        }

        const availableWidth = maxWidth - margins[1] - margins[3]
        const availableHeight = maxHeight - margins[0] - margins[2]

        elements.floating.style.maxWidth = px(
          Math.min(availableWidth, maxWidthRef.current ?? Infinity),
        )
        elements.floating.style.maxHeight = px(availableHeight)
      }

      const nextDimensions = await platform.getDimensions(elements.floating)

      const targetH = nextDimensions.height
      const targetW = nextDimensions.width

      if (floatingW !== targetW || floatingH !== targetH) {
        return {reset: {rects: true}}
      }

      return {}
    },
  }
}

/**
 * A CSS length for a computed size, never negative: a negative length is invalid CSS, which the
 * CSSOM ignores, leaving the previous value in place — and the margins can exceed the reference
 * width, as the padding can exceed the room within a narrow boundary
 */
function px(length: number): string {
  return `${Math.max(0, length)}px`
}
