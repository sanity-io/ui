import {_resp} from '../../_resp'
import {MaxWidthStyleProps} from './types'

/** @internal */
export function maxWidth(props: MaxWidthStyleProps): string {
  return _resp('max-w', props.maxWidth) ?? ''
}
