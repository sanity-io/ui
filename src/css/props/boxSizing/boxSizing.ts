// import {_resp} from '../../_resp'
// import {_scopeClassNames} from '../../_scopeClassNames'
import {options} from './boxSizing.css'
import type {BoxSizingStyleProps} from './types'

/** @internal */
export function boxSizing(props: BoxSizingStyleProps): string | undefined {
  // return _scopeClassNames(_resp('box', props.boxSizing))
  return props.boxSizing && options[props.boxSizing]
}
