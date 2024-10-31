import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {InsetStyleProps} from './types'

/** @internal */
export function inset(props: InsetStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('inset', props.inset),
    _resp('top', props.insetTop),
    _resp('right', props.insetRight),
    _resp('bottom', props.insetBottom),
    _resp('left', props.insetLeft),
  )
}
