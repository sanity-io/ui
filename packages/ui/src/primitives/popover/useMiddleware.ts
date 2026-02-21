import {
  autoPlacement,
  flip,
  hide,
  type Middleware,
  offset,
  type RootBoundary,
  shift as shiftMiddleware,
} from '@floating-ui/react-dom'
import {useMemo} from 'react'

import {_getResponsiveProp} from '../../helpers/props'
import {origin} from '../../middleware/origin'
import type {Placement} from '../../types'
import {DEFAULT_POPOVER_PADDING} from './constants'
import {size} from './floating-ui/size'

export function useMiddleware({
  animate,
  constrainSize,
  distance,
  shift,
  fallbackPlacements,
  floatingBoundary,
  matchReferenceWidth,
  placement,
  placementStrategy,
  preventOverflow,
  referenceBoundary,
  referenceWidthRef,
  rootBoundary,
}: {
  animate: boolean
  constrainSize: boolean
  distance: number
  shift: number
  fallbackPlacements: Placement[]
  floatingBoundary: HTMLElement | null
  matchReferenceWidth: boolean | undefined
  placement: Placement
  placementStrategy: 'flip' | 'autoPlacement'
  preventOverflow: boolean
  referenceBoundary: HTMLElement | null
  referenceWidthRef: React.RefObject<number | undefined>
  rootBoundary: RootBoundary
}) {
  return useMemo(() => {
    const ret: Middleware[] = []

    // Flip the floating element when leaving the boundary box
    if (constrainSize || preventOverflow) {
      if (placementStrategy === 'autoPlacement') {
        ret.push(
          autoPlacement({
            allowedPlacements: [placement].concat(fallbackPlacements),
          }),
        )
      } else {
        ret.push(
          flip({
            boundary: floatingBoundary || undefined,
            fallbackPlacements,
            padding: DEFAULT_POPOVER_PADDING,
            rootBoundary,
          }),
        )
      }
    }

    // Define distance between reference and floating element
    ret.push(offset({mainAxis: distance, crossAxis: shift}))

    // Track sizes
    if (constrainSize || matchReferenceWidth) {
      ret.push(
        size({
          boundaryElement: floatingBoundary || undefined,
          constrainSize,
          matchReferenceWidth,
          padding: DEFAULT_POPOVER_PADDING,
          referenceWidthRef,
        }),
      )
    }

    // Shift the popover so its sits within the boundary element
    if (preventOverflow) {
      ret.push(
        shiftMiddleware({
          boundary: floatingBoundary || undefined,
          rootBoundary,
          padding: DEFAULT_POPOVER_PADDING,
        }),
      )
    }

    // Determine the origin to scale from.
    // Must be placed after `@sanity/ui/size` and `shift` middleware.
    if (animate) {
      ret.push(origin)
    }

    ret.push(
      hide({
        boundary: referenceBoundary || undefined,
        padding: DEFAULT_POPOVER_PADDING,
        strategy: 'referenceHidden',
      }),
    )

    return ret
  }, [
    animate,
    constrainSize,
    distance,
    fallbackPlacements,
    floatingBoundary,
    matchReferenceWidth,
    placement,
    placementStrategy,
    preventOverflow,
    referenceBoundary,
    referenceWidthRef,
    rootBoundary,
    shift,
  ])
}
