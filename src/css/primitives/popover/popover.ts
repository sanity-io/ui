import {_composeClassNames} from '../../_composeClassNames'
import {card, root} from './popover.css'

/** @public */
export function popover(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function popoverCard(): string | undefined {
  return _composeClassNames(card)
}
