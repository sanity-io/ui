import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {root, weightOptions} from './font.css'
import type {FontStyleProps} from './types'

/** @public */
export function font(props: FontStyleProps): string | undefined {
  return _composeClassNames(root, weightOptions[props.weight ?? 'regular'])
}
