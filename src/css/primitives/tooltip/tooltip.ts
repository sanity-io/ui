import {_composeClassNames} from '../../_composeClassNames'
import {root} from './tooltip.css'
import type {TooltipStyleProps} from './types'

/** @public */
export function tooltip(props: TooltipStyleProps): string | undefined {
  return _composeClassNames(props.className, root)
}
