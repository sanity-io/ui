import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {PaddingStyleProps} from './types'

export function padding(props: PaddingStyleProps): string | undefined {
  return composeClassNames(
    _resp('p', props.padding),
    _resp('px', props.paddingX),
    _resp('py', props.paddingY),
    _resp('pt', props.paddingTop),
    _resp('pr', props.paddingRight),
    _resp('pb', props.paddingBottom),
    _resp('pl', props.paddingLeft),
  )
}
