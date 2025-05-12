import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {GapStyleProps} from './types'

/** @public */
export function gap(props: GapStyleProps): string | undefined {
  return composeClassNames(_resp(`g`, props.gap), _resp(`gx`, props.gapX), _resp(`gy`, props.gapY))
}
