import {composeClassNames} from '../../composeClassNames'
import {shadow} from '../../styles'
import {box} from '../box'
import {toneMap} from './_constants'
import {CardStyleProps} from './types'

export function card(props: CardStyleProps): string | undefined {
  return composeClassNames(
    props.scheme,
    toneMap[props.tone ?? 'inherit'],
    'card',
    props.checkered && 'card-checkered',
    box(props),
    shadow(props),
  )
}
