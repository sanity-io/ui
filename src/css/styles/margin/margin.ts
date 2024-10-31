import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {MarginStyleProps} from './types'

export function margin(props: MarginStyleProps): string | undefined {
  return composeClassNames(
    _resp('m', props.margin),
    _resp('mx', props.marginX),
    _resp('my', props.marginY),
    _resp('mt', props.marginTop),
    _resp('mr', props.marginRight),
    _resp('mb', props.marginBottom),
    _resp('ml', props.marginLeft),
  )
}
