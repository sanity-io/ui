import {composeClassNames} from '../../composeClassNames'
import {radius} from '../../styles'
import {KBDStyleProps} from './types'

export function kbd(props: KBDStyleProps): string | undefined {
  return composeClassNames('kbd', radius(props))
}
