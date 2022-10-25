import {Middleware, detectOverflow} from '@floating-ui/react-dom'

export function size(scope: {
  boundaryElement: HTMLElement | null
  constrainSize: boolean
  matchReferenceWidth?: boolean
  padding?: number
  setAvailableWidth: (v: number) => void
  setAvailableHeight: (v: number) => void
  setReferenceWidth: (v: number) => void
}): Middleware {
  const {padding = 0} = scope

  return {
    name: '@sanity/ui/size',
    async fn(args) {
      const {placement, rects} = args
      const {floating, reference} = rects

      const overflow = await detectOverflow(args, {
        altBoundary: true,
        boundary: scope.boundaryElement || undefined,
        elementContext: 'floating',
        padding,
        rootBoundary: 'viewport',
      })

      let maxWidth = Infinity
      let maxHeight = Infinity

      if (placement.includes('top')) {
        maxWidth = floating.width - (overflow.left + overflow.right)
        maxHeight = floating.height - overflow.top - padding
      }

      if (placement.includes('right')) {
        maxWidth = floating.width - overflow.right - padding
        maxHeight = floating.height - (overflow.top + overflow.bottom)
      }

      if (placement.includes('bottom')) {
        maxWidth = floating.width - (overflow.left + overflow.right)
        maxHeight = floating.height - overflow.bottom - padding
      }

      if (placement.includes('left')) {
        maxWidth = floating.width - overflow.left - padding
        maxHeight = floating.height - (overflow.top + overflow.bottom)
      }

      if (scope.constrainSize) {
        scope.setAvailableWidth(maxWidth)
        scope.setAvailableHeight(maxHeight)
      }

      if (scope.matchReferenceWidth) {
        scope.setReferenceWidth(reference.width)
      }

      if (!floating.width || !floating.height) {
        return {reset: {rects: true}}
      }

      return {}
    },
  }
}
