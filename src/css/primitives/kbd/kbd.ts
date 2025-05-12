import {_comp} from '../../_comp'
import {radius} from '../../aspects'
import {KBDStyleProps} from './types'

export function kbd(props: KBDStyleProps): string | undefined {
  return _comp('kbd', radius(props))
}
