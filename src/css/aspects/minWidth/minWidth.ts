import {_resp} from '../../_resp'
import {MinWidthStyleProps} from './types'

/** @internal */
export function minWidth(props: MinWidthStyleProps): string {
  return _resp('min-w', props.minWidth) ?? ''
}
