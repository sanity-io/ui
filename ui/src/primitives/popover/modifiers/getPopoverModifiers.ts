import maxSizeModifier from 'popper-max-size-modifier'
import {Modifier} from 'react-popper'
import {Placement} from '../../../types'
import {applyMaxSizeModifier} from './applyMaxSize'
import {matchReferenceWidthModifier} from './matchReferenceWidth'

export function getPopoverModifiers({
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
  return [
    constrainSize && {
      ...maxSizeModifier,
      options: {
        boundary: boundaryElement || undefined,
        padding: 8,
      },
    },
    constrainSize && applyMaxSizeModifier,
    arrow && {
      name: 'arrow',
      options: {
        element: arrowElement,
        padding: 4,
      },
    },
    preventOverflow && {
      name: 'preventOverflow',
      options: {
        altAxis: true,
        boundary: boundaryElement || undefined,
        padding: 8,
        tether,
        tetherOffset,
      },
    },
    {
      name: 'offset',
      options: {
        offset: [skidding, distance],
      },
    },
    {
      name: 'flip',
      options: {
        allowedAutoPlacements,
        boundary: boundaryElement || undefined,
        fallbackPlacements,
        padding: 8,
      },
    },
    matchReferenceWidth && matchReferenceWidthModifier,
  ].filter(Boolean) as Modifier<any, any>[]
}
