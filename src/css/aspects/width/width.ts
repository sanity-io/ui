import {_resp} from '../../_resp'
import {WidthStyleProps} from './types'

/** @internal */
export function width(props: WidthStyleProps): string {
  return _resp('w', props.width) ?? ''
}
