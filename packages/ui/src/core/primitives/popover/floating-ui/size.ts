import {detectOverflow, Middleware} from '@floating-ui/react-dom'

import {PopoverMargins} from '../../../types/popover'

export function size(options: {
  boundaryElement?: HTMLElement | null
  constrainSize: boolean
  margins: PopoverMargins
  matchReferenceWidth?: boolean
  maxWidth: number | undefined
  padding?: number
}): Middleware {
  const {constrainSize, margins, matchReferenceWidth, padding = 0} = options

  return {
    name: '@sanity/ui/size',
    // `useFloating` compares middleware deeply and functions by their source text, so without its
    // `options` it would keep running this middleware with outdated ones
    options,
    async fn(args) {
      const {elements, placement, platform, rects} = args
      const {floating, reference} = rects

      const overflow = await detectOverflow(args, {
        altBoundary: true,
        boundary: options.boundaryElement || undefined,
        elementContext: 'floating',
        padding,
        rootBoundary: 'viewport',
      })

      let maxWidth = Infinity
      let maxHeight = Infinity

      const floatingW = floating.width
      const floatingH = floating.height

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

      // IMPORTANT – APPLY ELEMENT STYLES HERE
      // Elements need to be resized BEFORE the `platform.getDimensions` call below, and never to a
      // negative size: CSS ignores a negative length, keeping the previous one
      const availableWidth = maxWidth - margins[1] - margins[3]
      const availableHeight = maxHeight - margins[0] - margins[2]
      const referenceWidth = Math.max(0, reference.width - margins[1] - margins[3])

      if (matchReferenceWidth) {
        elements.floating.style.width = `${referenceWidth}px`
      }

      if (constrainSize) {
        // No room at all means the popover lies outside the area it is measured in, like a submenu
        // beside the scrolling menu its reference is in: a max size of zero would collapse it
        const constrainedWidth = Math.min(
          availableWidth > 0 ? availableWidth : Infinity,
          options.maxWidth ?? Infinity,
        )

        elements.floating.style.maxWidth = Number.isFinite(constrainedWidth)
          ? `${constrainedWidth}px`
          : ''

        elements.floating.style.maxHeight = availableHeight > 0 ? `${availableHeight}px` : ''
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
