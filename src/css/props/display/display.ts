// import {_resp} from '../../_resp'
// import {_scopeClassNames} from '../../_scopeClassNames'
// import type {DisplayStyleProps} from './types'

// /** @internal */
// export function display(props: DisplayStyleProps): string | undefined {
//   return _scopeClassNames(_resp(undefined, props.display))
// }

import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './display.css'
import type {DisplayStyleProps} from './types'

/** @public */
export function display(props: DisplayStyleProps) {
  return _responsiveClassName(options, props.display)
}
