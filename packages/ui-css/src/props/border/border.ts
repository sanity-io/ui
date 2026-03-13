import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {
  borderBottomOptions,
  borderLeftOptions,
  borderOptions,
  borderRightOptions,
  borderTopOptions,
  borderWidthOptions,
} from './border.css'
import type {BorderStyleProps} from './types'

/** @public */
export function border(props: BorderStyleProps): string | undefined {
  return _composeClassNames(
    _responsiveClassName(borderOptions, props.border ?? 'none', {valueWhenTrue: 'muted'}),
    _responsiveClassName(borderTopOptions, props.borderTop, {valueWhenTrue: 'muted'}),
    _responsiveClassName(borderRightOptions, props.borderRight, {valueWhenTrue: 'muted'}),
    _responsiveClassName(borderBottomOptions, props.borderBottom, {valueWhenTrue: 'muted'}),
    _responsiveClassName(borderLeftOptions, props.borderLeft, {valueWhenTrue: 'muted'}),

    _responsiveClassName(borderWidthOptions, props.borderWidth ?? 2),
  )
}
