import {_composeClassNames} from '../../_composeClassNames'
import {box} from '../box/box'
import type {GridStyleProps} from './types'

/** @public */
export function grid(props: GridStyleProps): string | undefined {
  return _composeClassNames(box({...props, display: 'grid'}))
}
