import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {InsetStyleProps} from './types'

export function inset(props: InsetStyleProps): string | undefined {
  return composeClassNames(
    _resp('inset', props.inset),
    _resp('top', props.insetTop),
    _resp('right', props.insetRight),
    _resp('bottom', props.insetBottom),
    _resp('left', props.insetLeft),
  )
}
