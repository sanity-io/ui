import {_comp} from '../../_comp'
import {shadow} from '../../aspects'
import {CardStyleProps} from './types'

/** @public */
export function card(props: CardStyleProps): string | undefined {
  return _comp(
    props.scheme,
    props.tone ?? 'default',
    'card',
    props.checkered && 'card-checkered',
    shadow(props),
  )
}
