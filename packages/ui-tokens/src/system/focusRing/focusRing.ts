import type {DTCGShadowToken} from '../_dtcg/schema'
import type {TokenCollection} from '../types'

export const FOCUS_RING_NAMESPACE = 'focusRing'

export interface FocusRingCollectionTokens {
  [FOCUS_RING_NAMESPACE]: {
    default: DTCGShadowToken
    inset: DTCGShadowToken
  }
}

export type FocusRingCollection = TokenCollection<
  typeof FOCUS_RING_NAMESPACE,
  'default',
  FocusRingCollectionTokens
>

export const focusRingCollection: FocusRingCollection = {
  namespace: FOCUS_RING_NAMESPACE,
  title: 'Focus ring',
  modes: {
    default: {
      [FOCUS_RING_NAMESPACE]: {
        default: {
          $type: 'shadow',
          $value: [
            {
              color: '{color.bg}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: {value: 1, unit: 'px'},
            },
            {
              color: '{color.focusRing}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: {value: 2, unit: 'px'},
            },
          ],
        },
        inset: {
          $type: 'shadow',
          $value: [
            {
              color: '{color.focusRing}',
              offsetX: {value: 0, unit: 'px'},
              offsetY: {value: 0, unit: 'px'},
              blur: {value: 0, unit: 'px'},
              spread: {value: 1, unit: 'px'},
              inset: true,
            },
          ],
        },
      },
    },
  },
}
