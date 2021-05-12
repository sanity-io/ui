import maxSizeModifier from 'popper-max-size-modifier'
import {Modifier} from 'react-popper'
import {Placement} from '../../../types'

/*

The order of popper phases:

- beforeRead
- read
- afterRead
- beforeMain
- main
- afterMain
- beforeWrite
- write
- afterWrite

*/

export function getPopoverModifiers({
  allowedAutoPlacements,
  arrow,
  arrowElement,
  boundaryElement,
  constrainSize,
  distance,
  fallbackPlacements,
  margins,
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
  margins?: [number, number, number, number]
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
    constrainSize && {
      name: 'applyMaxSize',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['maxSize'],
      fn({state}: any) {
        const {width, height} = state.modifiersData.maxSize

        state.styles.popper = {
          ...state.styles.popper,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
        }
      },
    },
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
      name: 'margins',
      enabled: true,
      phase: 'beforeRead',
      fn: ({state}: any) => {
        const {rects} = state

        if (margins && rects.reference) {
          rects.reference.x += margins[3]
          rects.reference.y += margins[1]
          rects.reference.width -= margins[1] + margins[3]
          rects.reference.height -= margins[0] + margins[2]
        }
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
    matchReferenceWidth && {
      name: 'matchWidth',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn({state}: any) {
        const {width} = state.rects.reference

        state.styles.popper.width = `${width}px`
      },
      effect: ({state}: any) => {
        const refElement = state.elements.reference

        if (refElement instanceof HTMLElement) {
          state.elements.popper.style.width = `${
            refElement.offsetWidth - (margins ? margins[1] + margins[3] : 0)
          }px`
        }
      },
    },
  ].filter(Boolean) as Modifier<any, any>[]
}
