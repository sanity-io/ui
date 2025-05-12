import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {BorderStyleProps} from './types'

/** @public */
export function border(props: BorderStyleProps): string | undefined {
  return composeClassNames(
    _resp('border', props.border),
    _resp('border-t', props.borderTop),
    _resp('border-r', props.borderRight),
    _resp('border-b', props.borderBottom),
    _resp('border-l', props.borderLeft),
  )
}
