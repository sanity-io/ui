import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {gapOptions, gapXOptions, gapYOptions} from './gap.css'
import type {GapStyleProps} from './types'

/** @public */
export function gap(props: GapStyleProps) {
  return _composeClassNames(
    _responsiveClassName(gapOptions, props.gap),
    _responsiveClassName(gapXOptions, props.gapX),
    _responsiveClassName(gapYOptions, props.gapY),
  )
}
