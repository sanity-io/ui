import {detectOverflow, Middleware, MiddlewareState} from '@floating-ui/react-dom'

import {PopoverMargins} from '../../../types/popover'

const NATURAL_HEIGHT_MIDDLEWARE_NAME = '@sanity/ui/natural-height'
// Rects are rounded while the caps keep their fractions
const CAP_TOLERANCE_PX = 1

interface ScrollPosition {
  element: Element
  left: number
  top: number
}

function reachesCap(dimension: number, cap: string): boolean {
  return cap === '' ? false : dimension >= Number.parseFloat(cap) - CAP_TOLERANCE_PX
}

function collectScrollPositions(root: HTMLElement): ScrollPosition[] {
  return [root, ...root.querySelectorAll('*')]
    .filter((element) => Math.abs(element.scrollTop) > 0 || Math.abs(element.scrollLeft) > 0)
    .map((element) => ({element, left: element.scrollLeft, top: element.scrollTop}))
}

function restoreScrollPositions(positions: ScrollPosition[]): void {
  positions.forEach(({element, left, top}) => {
    element.scrollTo({behavior: 'instant', left, top})
  })
}

async function measureWithoutMaxHeight(
  floating: HTMLElement,
  platform: MiddlewareState['platform'],
): Promise<number> {
  const {maxHeight} = floating.style
  // Lifting the cap shrinks the scroll range of containers inside, which clamps their offset
  const scrollPositions = collectScrollPositions(floating)

  floating.style.maxHeight = ''

  const {height} = await platform.getDimensions(floating)

  floating.style.maxHeight = maxHeight
  restoreScrollPositions(scrollPositions)

  return height
}

/**
 * Hands `flip` the floating element's height without the max height `size` set for the space on
 * its current side, measured once per update. The max width stays, so content keeps its wrapping.
 */
export function naturalHeight(): Middleware {
  return {
    name: NATURAL_HEIGHT_MIDDLEWARE_NAME,
    async fn({elements, middlewareData, platform, rects}) {
      if (middlewareData[NATURAL_HEIGHT_MIDDLEWARE_NAME]?.measured) return {}

      if (reachesCap(rects.floating.height, elements.floating.style.maxHeight)) {
        const height = await measureWithoutMaxHeight(elements.floating, platform)

        return {
          data: {measured: true},
          reset: {rects: {reference: rects.reference, floating: {...rects.floating, height}}},
        }
      }

      return {}
    },
  }
}

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
