import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {PositionStyleProps} from './types'

export function position(props: PositionStyleProps): string | undefined {
  return composeClassNames(_resp('pos', props.position))
}
