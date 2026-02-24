import {_composeClassNames} from '../../_composeClassNames'
import {patterns} from './bgPattern.css'
import type {BgPatternStyleProps} from './types'

/** @public */
export function bgPattern(props: BgPatternStyleProps) {
  return _composeClassNames(props.bgPattern && patterns[props.bgPattern])
}
