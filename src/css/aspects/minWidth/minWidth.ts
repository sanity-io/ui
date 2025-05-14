import {_resp} from '../../_resp'
import {MinWidthStyleProps} from './types'

export function minWidth(props: MinWidthStyleProps): string {
  return _resp('min-w', props.minWidth) ?? ''
}
