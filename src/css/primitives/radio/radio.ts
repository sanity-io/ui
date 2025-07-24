import {_composeClassNames} from '../../_composeClassNames'
import {input, presentation, root} from './radio.css'

/** @public */
export function radio(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function radioInput(): string | undefined {
  return input
}

/** @public */
export function radioPresentation(): string | undefined {
  return presentation
}
