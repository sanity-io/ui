import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {flexItem, font, textAlign} from '../../aspects'
import type {TextStyleProps} from './types'

/** @public */
export function text(props: TextStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('text', 'block', props.muted && 'text-muted', _resp(`text`, props.size)),
    flexItem(props),
    font(props),
    textAlign({textAlign: props.align}),
  )
}
