import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {display, flexItem, radius, width} from '../../aspects'
import type {ButtonStyleProps} from './types'

/** @public */
export function button(props: ButtonStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames('button'),
    display(props),
    flexItem(props),
    radius(props),
    width(props),
  )
}

/** @public */
export function buttonLoadingBox(): string | undefined {
  return _scopeClassNames('button-loading-box')
}
