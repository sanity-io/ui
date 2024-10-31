import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {ResponsiveProp} from '../../types'

/** @public */
export type BoxHeight = 'stretch' | 'fill'

/** @public */
export interface HeightStyleProps {
  height?: ResponsiveProp<BoxHeight>
}

/** @internal */
export function height(props: HeightStyleProps): string | undefined {
  return _scopeClassNames(_resp(`h`, props.height))
}
