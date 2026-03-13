import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {gapOptions, gapXOptions, gapYOptions} from './gap.css'
import type {GapStyleProps} from './types'

/** @public */
export function gap(props: GapStyleProps): string | undefined {
  return _composeClassNames(
    _responsiveClassName(gapOptions, props.gap),
    _responsiveClassName(gapXOptions, props.gapX),
    _responsiveClassName(gapYOptions, props.gapY),
  )
}
