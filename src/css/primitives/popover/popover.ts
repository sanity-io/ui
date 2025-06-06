import {_composeClassNames} from '../../_composeClassNames'
import {card, root} from './popover.css'

/** @public */
export function popover(props: {className?: string}) {
  return _composeClassNames(props.className, root)
}

/** @public */
export function popoverCard() {
  return _composeClassNames(card)
}
