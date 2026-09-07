import {Middleware} from '@floating-ui/react-dom'

/**
 * Custom floating-ui middleware which calculates transform-origin X + Y offsets
 * based on the current floating rect's dimensions and shift offset.
 *
 * Scaling popovers with these transform-origin offsets will give the effect of
 * popvers slightly 'growing' from the origin/reference element.
 *
 * This middleware must be applied after both `@sanity/ui/size` and `shift` middlewares.
 */
export const origin: Middleware = {
  name: '@sanity/ui/origin',
  fn({middlewareData, placement, rects}) {
    const [side] = placement.split('-')

    const floatingWidth = rects.floating.width
    const floatingHeight = rects.floating.height

    const shiftX = middlewareData.shift?.x || 0
    const shiftY = middlewareData.shift?.y || 0

    if (floatingWidth <= 0 || floatingHeight <= 0) {
      return {}
    }

    const isVerticalPlacement = ['bottom', 'top'].includes(side)

    const {originX, originY}: {originX: number; originY: number} = isVerticalPlacement
      ? {
          originX: clamp(0.5 - shiftX / floatingWidth, 0, 1),
          originY: side === 'bottom' ? 0 : 1,
        }
      : {
          originX: side === 'left' ? 1 : 0,
          originY: clamp(0.5 - shiftY / floatingHeight, 0, 1),
        }

    return {
      data: {originX, originY},
    }
  },
}

/**
 * Converts the `origin` middleware data into a plain `transform-origin` CSS value.
 *
 * The value is intentionally applied as a regular CSS property rather than motion's
 * `originX`/`originY` style keys: motion turns those into motion values that it resets to
 * their initial (unpositioned, `undefined`) state whenever the element re-mounts, which is
 * what happens every time an `Activity`-hidden popover or tooltip is shown again.
 */
export function getTransformOrigin(originX?: number, originY?: number): string | undefined {
  if (originX === undefined || originY === undefined) return undefined

  return `${originX * 100}% ${originY * 100}%`
}

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}
