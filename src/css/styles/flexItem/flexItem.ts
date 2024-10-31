import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {FlexItemStyleProps} from './types'

/** @public */
export function flexItem(props: FlexItemStyleProps): string {
  return composeClassNames(_resp(`flex`, props.flex))
}
