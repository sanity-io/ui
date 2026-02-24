import {_composeClassNames} from '../../_composeClassNames'
import {options, root} from './elementTone.css'
import type {ElementToneStyleProps} from './types'

/** @internal */
// TODO: move to `ui-tokens` collection?
export function elementTone(props: ElementToneStyleProps) {
  return _composeClassNames(root, options[props.elementTone ?? 'default'])
}
