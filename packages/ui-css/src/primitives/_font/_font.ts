import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {root, weightOptions} from './_font.css'
import type {FontStyleProps} from './types'

/** @internal */
export function _font(props: FontStyleProps): string | undefined {
  return _composeClassNames(root, weightOptions[props.weight ?? 'regular'])
}
