import {composeClassNames} from '../../composeClassNames'
import {TextOverflowStyleProps} from './types'

export function textOverflow(props: TextOverflowStyleProps): string | undefined {
  return composeClassNames(props.textOverflow && `text-overflow-${props.textOverflow}`)
}
