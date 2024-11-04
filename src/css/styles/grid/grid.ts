import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {GridStyleProps} from './types'

export function grid(props: GridStyleProps): string | undefined {
  return composeClassNames(
    _resp('auto-cols', props.autoCols),
    _resp('auto-rows', props.autoRows),
    _resp('auto-flow', props.autoFlow),
    _resp('columns', props.columns),
    _resp('rows', props.rows),
  )
}
