import {_responsiveClassName} from '../../_responsiveClassName'
import {options} from './alignItems.css'
import type {AlignItemsStyleProps} from './types'

/** @public */
export function alignItems(props: AlignItemsStyleProps) {
  return _responsiveClassName(options, props.alignItems)
}
