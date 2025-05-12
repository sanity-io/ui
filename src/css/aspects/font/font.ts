import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {FontStyleProps} from './types'

/** @public */
export function font(props: FontStyleProps): string | undefined {
  return composeClassNames(
    'font',
    props.weight && `font-${props.weight}`,
    _resp('text-align', props.align),
  )
}
