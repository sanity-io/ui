import {_composeClassNames} from '../../_composeClassNames'
import {root, weights} from './font.css'
import type {FontStyleProps} from './types'

/** @public */
export function font(props: FontStyleProps): string | undefined {
  return _composeClassNames(root, weights[props.weight ?? 'regular'])
}
