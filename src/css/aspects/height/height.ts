import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type BoxHeight = 'stretch' | 'fill'

export interface HeightStyleProps {
  height?: ResponsiveProp<BoxHeight>
}

/** @public */
export function height(props: HeightStyleProps): string | undefined {
  return composeClassNames(_resp(`h`, props.height))
}
