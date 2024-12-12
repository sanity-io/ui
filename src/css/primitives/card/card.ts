import {composeClassNames} from '../../composeClassNames'
import {box} from '../box'
import {CardStyleProps} from './types'

export function card(props: CardStyleProps): string | undefined {
  return composeClassNames(
    'card',
    props.checkered && 'card-checkered',
    box(props),
    props.shadow === undefined ? undefined : `shadow-${props.shadow}`,
  )
}
