import {_composeClassNames} from '../../_composeClassNames'
import {root, schemes, tones} from './card.css'
import type {CardStyleProps} from './types'

/** @public */
export function card(props: CardStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.scheme && schemes[props.scheme],
    props.tone && props.tone !== 'inherit' && tones[props.tone],
  )
}
