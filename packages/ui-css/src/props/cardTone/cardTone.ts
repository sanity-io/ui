import {_cardToneClassNames} from '../../vars/context/card/_tone.css'
import type {CardToneStyleProps} from './types'

/** @public */
export function cardTone(props: CardToneStyleProps) {
  return _cardToneClassNames[props.cardTone ?? 'default']
}
