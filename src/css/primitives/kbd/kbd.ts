import {_composeClassNames} from '../../_composeClassNames'
import {radius} from '../../props/radius/radius'
import {root} from './kbd.css'
import type {KBDStyleProps} from './types'

/** @public */
export function kbd(props: KBDStyleProps): string | undefined {
  return _composeClassNames(props.className, root, radius(props))
}
