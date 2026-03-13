import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {position} from '../../props/position/position'
import {input, presentation, root} from './radio.css'

/** @public */
export function radio(props: {className?: string}): string | undefined {
  return _composeClassNames(
    props.className,
    root,

    display({display: 'block'}),
    flexProp({flex: 'none'}),
    position({position: 'relative'}),
  )
}

/** @public */
export function radio_input(): string | undefined {
  return input
}

/** @public */
export function radio_presentation(): string | undefined {
  return presentation
}
