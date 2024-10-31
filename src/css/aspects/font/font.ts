import {_scopeClassNames} from '../../_scopeClassNames'
import type {FontStyleProps} from './types'

/** @public */
export function font(props: FontStyleProps): string | undefined {
  return _scopeClassNames('font', props.weight && `font-${props.weight}`)
}
