import type {DTCGDurationToken, DTCGShadowToken, DTCGStringToken} from '../_dtcg/schema'
import {_px} from '../_px'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'

export const INPUT_NAMESPACE = 'input'

export interface InputCollectionTokens {
  [INPUT_NAMESPACE]: {
    border: {
      width: SanityDimensionToken
    }
    checkbox: {
      focusRing: DTCGShadowToken
      size: SanityDimensionToken
    }
    radio: {
      size: SanityDimensionToken
      markSize: SanityDimensionToken
      focusRing: DTCGShadowToken
    }
    select: {
      focusRing: DTCGShadowToken
    }
    switch: {
      width: SanityDimensionToken
      height: SanityDimensionToken
      padding: SanityDimensionToken
      focusRing: DTCGShadowToken
      transitionDurationMs: DTCGDurationToken
      transitionTimingFunction: DTCGStringToken
    }
    text: {
      focusRing: DTCGShadowToken
    }
  }
}

export type InputCollection = TokenCollection<
  typeof INPUT_NAMESPACE,
  'default',
  InputCollectionTokens
>

export const inputCollection: InputCollection = {
  namespace: INPUT_NAMESPACE,
  title: 'Input',
  modes: {
    default: {
      [INPUT_NAMESPACE]: {
        border: {
          width: {
            $type: 'dimension',
            $value: '{border.2}',
          },
        },
        checkbox: {
          size: _px(17),
          focusRing: {
            $type: 'shadow',
            $value: '{focusRing.default}',
          },
        },
        radio: {
          size: _px(17),
          markSize: _px(9),
          focusRing: {
            $type: 'shadow',
            $value: '{focusRing.default}',
          },
        },
        select: {
          focusRing: {
            $type: 'shadow',
            $value: '{focusRing.default}',
          },
        },
        switch: {
          width: _px(25),
          height: _px(17),
          padding: _px(4),
          focusRing: {
            $type: 'shadow',
            $value: '{focusRing.default}',
          },
          transitionDurationMs: {$type: 'duration', $value: {value: 150, unit: 'ms'}},
          transitionTimingFunction: {$type: 'string', $value: 'ease-out'},
        },
        text: {
          focusRing: {
            $type: 'shadow',
            $value: '{focusRing.default}',
          },
        },
      },
    },
  },
}
