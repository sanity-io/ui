import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {FlexStyleProps} from './types'

/** @public */
export function flex(props: FlexStyleProps): string | undefined {
  return composeClassNames(
    _resp('flex-align', props.align),
    _resp('f', props.direction),
    _resp('flex-justify', props.justify),
    _resp('flex', props.wrap),
  )
}
