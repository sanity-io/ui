import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {flexItem, font} from '../../aspects'
import {TextStyleProps} from './types'

/** @public */
export function text(props: TextStyleProps): string | undefined {
  return _comp(
    'text',
    'block',
    flexItem(props),
    font(props),
    props.accent && 'text-accent',
    props.muted && 'text-muted',
    _resp(`text`, props.size),
  )
}
