import {_composeClassNames} from '../../_composeClassNames'
import {_cardToneClassNames} from '../../system/_cardTone.css'
import type {CardToneStyleProps} from './types'

/** @public */
export function cardTone(props: CardToneStyleProps) {
  return _cardToneClassNames[props.cardTone ?? 'default']
}
