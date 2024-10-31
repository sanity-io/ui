import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {TextAlignStyleProps} from './types'

/** @public */
export function textAlign(props: TextAlignStyleProps): string | undefined {
  return composeClassNames(_resp('text-align', props.textAlign))
}
