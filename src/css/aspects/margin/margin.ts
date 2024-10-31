import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {MarginStyleProps} from './types'

/** @internal */
export function margin(props: MarginStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('m', props.margin),
    _resp('mx', props.marginX),
    _resp('my', props.marginY),
    _resp('mt', props.marginTop),
    _resp('mr', props.marginRight),
    _resp('mb', props.marginBottom),
    _resp('ml', props.marginLeft),
  )
}
