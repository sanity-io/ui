import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {PaddingStyleProps} from './types'

/** @internal */
export function padding(props: PaddingStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('p', props.padding),
    _resp('px', props.paddingX),
    _resp('py', props.paddingY),
    _resp('pt', props.paddingTop),
    _resp('pr', props.paddingRight),
    _resp('pb', props.paddingBottom),
    _resp('pl', props.paddingLeft),
  )
}
