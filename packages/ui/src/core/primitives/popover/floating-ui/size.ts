import {detectOverflow, Middleware} from '@floating-ui/react-dom'

import {PopoverMargins} from '../../../types'

export function size(options: {
  boundaryElement?: HTMLElement | null
  constrainSize: boolean
  margins: PopoverMargins
  matchReferenceWidth?: boolean
  maxWidthRef: React.RefObject<number | undefined>
  padding?: number
  referenceWidthRef: React.RefObject<number | undefined>
  setReferenceWidth: (referenceWidth: number) => void
  widthRef: React.RefObject<number | undefined>
}): Middleware {
  const {
    constrainSize,
    margins,
    matchReferenceWidth,
    maxWidthRef,
    padding = 0,
    referenceWidthRef,
    setReferenceWidth,
    widthRef,
  } = options

  return {
    name: '@sanity/ui/size',
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
      // Elements need to be resized BEFORE the `platform.getDimensions` call below
      const availableWidth = maxWidth - margins[1] - margins[3]
      const availableHeight = maxHeight - margins[0] - margins[2]
      const referenceWidth = reference.width - margins[1] - margins[3]
      referenceWidthRef.current = referenceWidth
      setReferenceWidth(referenceWidth)

      if (matchReferenceWidth) {
        elements.floating.style.width = `${referenceWidth}px`
      } else if (widthRef.current !== undefined) {
        elements.floating.style.width = `${widthRef.current}px`
      }

      if (constrainSize) {
        elements.floating.style.maxWidth = `${Math.min(availableWidth, maxWidthRef.current ?? Infinity)}px`

        elements.floating.style.maxHeight = `${availableHeight}px`
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
