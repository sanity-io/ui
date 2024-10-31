import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {shadow} from '../../aspects'
import type {CardStyleProps} from './types'

/** @public */
export function card(props: CardStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames(props.scheme, props.tone, 'card', props.checkered && 'card-checkered'),
    shadow(props),
  )
}
