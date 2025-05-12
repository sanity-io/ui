import {_comp} from '../../_comp'
import {shadow} from '../../aspects'
import {toneMap} from './_constants'
import {CardStyleProps} from './types'

export function card(props: CardStyleProps): string | undefined {
  return _comp(
    props.scheme,
    toneMap[props.tone ?? 'inherit'],
    'card',
    props.checkered && 'card-checkered',
    shadow(props),
  )
}
