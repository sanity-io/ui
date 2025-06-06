import {_composeClassNames} from '../../_composeClassNames'
import {radius} from '../../props/radius/radius'
import {root, tones} from './_selectable.css'
import type {SelectableStyleProps} from './types'

/** @internal */
export function _selectable(props: SelectableStyleProps): string | undefined {
  return _composeClassNames(props.className, root, tones[props.tone ?? 'default'], radius(props))
}
