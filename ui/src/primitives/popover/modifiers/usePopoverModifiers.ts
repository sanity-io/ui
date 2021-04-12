import {useMemo} from 'react'
import {Placement} from '../../../types'
import {getPopoverModifiers} from './getPopoverModifiers'

export function usePopoverModifiers({
  allowedAutoPlacements,
  arrow,
  arrowElement,
  boundaryElement,
  constrainSize,
  distance,
  fallbackPlacements,
  matchReferenceWidth,
  preventOverflow,
  skidding,
  tether,
  tetherOffset,
}: {
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  arrowElement?: HTMLElement | null
  boundaryElement?: HTMLElement | null
  constrainSize?: boolean
  distance: number
  fallbackPlacements?: Placement[]
  matchReferenceWidth?: boolean
  preventOverflow?: boolean
  skidding: number
  tether?: boolean
  tetherOffset?: number | ((...args: any[]) => number)
}) {
  return useMemo(
    () =>
      getPopoverModifiers({
        allowedAutoPlacements,
        arrow,
        arrowElement,
        boundaryElement,
        constrainSize,
        distance,
        fallbackPlacements,
        matchReferenceWidth,
        preventOverflow,
        skidding,
        tether,
        tetherOffset,
      }),
    [
      allowedAutoPlacements,
      arrow,
      arrowElement,
      boundaryElement,
      constrainSize,
      distance,
      fallbackPlacements,
      matchReferenceWidth,
      preventOverflow,
      skidding,
      tether,
      tetherOffset,
    ]
  )
}
