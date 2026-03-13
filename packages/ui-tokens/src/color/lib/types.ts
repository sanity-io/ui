import type {z} from 'zod'

import type {_DTCGColorValue, _DTCGTokenAlias} from '../../lib/dtcg/types'
import type {AvatarColor, CodeTokenKey, ColorVariant, ElementTone} from '../../types'
import type {SanityColorExtensionsSchema, SanityColorTokenSchema} from './schema'

export interface ElementToneColorTokens {
  bg: Record<0 | 1 | 2 | 3 | 4, ColorToken>
  border: Record<0 | 1 | 2 | 3 | 4, ColorToken>
  fg: Record<0 | 1 | 2 | 3 | 4, ColorToken>
}

export type CardToneTokens = {
  avatar: Record<
    AvatarColor,
    {
      bg: ColorToken
      fg: ColorToken
    }
  >
  backdrop: ColorToken
  code: {
    token: Record<CodeTokenKey, ColorToken>
  }
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
