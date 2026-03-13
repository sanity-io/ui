import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {options} from './alignItems.css'
import type {AlignItemsStyleProps} from './types'

/** @public */
export function alignItems(props: AlignItemsStyleProps): string | undefined {
  return _responsiveClassName(options, props.alignItems)
}
