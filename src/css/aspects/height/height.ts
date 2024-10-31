import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {ResponsiveProp} from '../../types'

/** @public */
export type BoxHeight = 'stretch' | 'fill'

/** @public */
export interface HeightStyleProps {
  height?: ResponsiveProp<BoxHeight>
}

/** @internal */
export function height(props: HeightStyleProps): string | undefined {
  return composeClassNames(_resp(`h`, props.height))
}
