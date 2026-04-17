import type {z} from 'zod'

import type {ColorVariant, ElementTone} from '../../types'
import type {_DTCGColorValue, _DTCGTokenAlias} from '../dtcg/types'
import type {SanityColorExtensionsSchema, SanityColorTokenSchema} from './schema'

export interface ElementToneColorTokens {
  bg: Record<0 | 1 | 2 | 3 | 4, ColorToken>
  border: Record<0 | 1 | 2 | 3 | 4, ColorToken>
  fg: Record<0 | 1 | 2 | 3 | 4, ColorToken>
}

export type CardToneTokens = {
  backdrop: ColorToken
  focusRing: ColorToken
  link: {
    fg: ColorToken
  }
  shadow: {
    outline: ColorToken
    umbra: ColorToken
    penumbra: ColorToken
    ambient: ColorToken
  }
} & Record<ColorVariant, Record<ElementTone, ElementToneColorTokens>>

/** @internal */
export type SanityColorExtensions = z.infer<typeof SanityColorExtensionsSchema>

/** @public */
export type SanityColorToken = z.infer<typeof SanityColorTokenSchema>

/** @internal */
export type ColorToken = Omit<SanityColorToken, '$type'>
