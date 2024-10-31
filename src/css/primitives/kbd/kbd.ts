import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles/radius'
import {KBDStyleProps} from './types'

export function kbd(props: KBDStyleProps): string {
  return composeClassNames('kbd', radius(props))
}
