// import {_resp} from '../../_resp'
// import {_scopeClassNames} from '../../_scopeClassNames'
// import type {BorderStyleProps} from './types'

// /** @public */
// export function border(props: BorderStyleProps): string | undefined {
//   return _scopeClassNames(
//     _resp('border', props.border),
//     _resp('border-t', props.borderTop),
//     _resp('border-r', props.borderRight),
//     _resp('border-b', props.borderBottom),
//     _resp('border-l', props.borderLeft),
//   )
// }

import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {
  borderBottomOptions,
  borderLeftOptions,
  borderOptions,
  borderRightOptions,
  borderTopOptions,
} from './border.css'
import type {BorderStyleProps} from './types'

/** @public */
export function border(props: BorderStyleProps) {
  return _composeClassNames(
    _responsiveClassName(borderOptions, props.border, {valueWhenTrue: 'solid'}),
    _responsiveClassName(borderTopOptions, props.borderTop, {valueWhenTrue: 'solid'}),
    _responsiveClassName(borderRightOptions, props.borderRight, {valueWhenTrue: 'solid'}),
    _responsiveClassName(borderBottomOptions, props.borderBottom, {valueWhenTrue: 'solid'}),
    _responsiveClassName(borderLeftOptions, props.borderLeft, {valueWhenTrue: 'solid'}),
  )
}
