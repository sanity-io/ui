import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {RadiusStyleProps} from './types'

/** @public */
export function radius(props: RadiusStyleProps): string | undefined {
  return composeClassNames(_resp('r', props.radius))
}
