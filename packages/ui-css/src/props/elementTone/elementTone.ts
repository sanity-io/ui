import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {elementToneClassNames} from '../../vars/element/tone.css'
import type {ElementToneStyleProps} from './types'

/** @internal */
export function elementTone(props: ElementToneStyleProps) {
  return _composeClassNames(elementToneClassNames[props.elementTone ?? 'default'])
}
