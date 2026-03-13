import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {position} from '../../props/position/position'
import {radius} from '../../props/radius/radius'
import {input, presentation, root} from './checkbox.css'

/** @public */
export function checkbox(props: {className?: string}) {
  return _composeClassNames(
    props.className,
    root,

    display({display: 'block'}),
    flexProp({flex: 'none'}),
    position({position: 'relative'}),
  )
}

/** @public */
export function checkbox_input() {
  return _composeClassNames(input, radius({radius: 2}))
}

/** @public */
export function checkbox_presentation() {
  return _composeClassNames(presentation, radius({radius: 2}))
}
