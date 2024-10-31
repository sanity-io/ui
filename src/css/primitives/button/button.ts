import {_comp} from '../../_comp'
import {display, flexItem, radius, width} from '../../aspects'
import {ButtonStyleProps} from './types'

/** @public */
export function button(props: ButtonStyleProps): string | undefined {
  return _comp('button', display(props), flexItem(props), radius(props), width(props))
}

/** @public */
export function buttonLoadingBox(): string | undefined {
  return 'button-loading-box'
}
