import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {DisplayStyleProps} from './types'

/** @internal */
export function display(props: DisplayStyleProps): string | undefined {
  return composeClassNames(_resp(undefined, props.display))
}
