import {detectOverflow, type Middleware} from '@floating-ui/react-dom'

export function size(options: {
  boundaryElement?: HTMLElement | null
  constrainSize: boolean
  matchReferenceWidth?: boolean
  padding?: number
  referenceWidthRef: React.RefObject<number | undefined>
}): Middleware {
  const {padding = 0, constrainSize, matchReferenceWidth, referenceWidthRef} = options

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

      referenceWidthRef.current = reference.width

      // IMPORTANT – APPLY ELEMENT STYLES HERE
      if (matchReferenceWidth) {
        elements.floating.style.width = `${reference.width}px`
      }
      if (constrainSize) {
        elements.floating.style.maxWidth = `${maxWidth}px`
        elements.floating.style.maxHeight = `${maxHeight}px`
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
