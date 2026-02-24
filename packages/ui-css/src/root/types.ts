import type {CardTone} from '@sanity/ui-tokens/system'

import type {CardStyleProps} from '../primitives/card/types'

/** @public */
export interface RootStyleProps extends Omit<CardStyleProps, 'tone'> {
  tone?: CardTone
}
