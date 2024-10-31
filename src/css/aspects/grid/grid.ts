import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {GridStyleProps} from './types'

/** @internal */
export function grid(props: GridStyleProps): string | undefined {
  return _scopeClassNames(
    _resp('auto-cols', props.autoCols),
    _resp('auto-flow', props.autoFlow),
    _resp('auto-rows', props.autoRows),
    _resp('cols', props.columns),
    _resp('rows', props.rows),
  )
}
