import {_composeClassNames} from '../../_composeClassNames'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {position} from '../../props/position/position'
import {input, presentation, root, thumb, track} from './switch.css'

/** @public */
export function _switch(props: {className?: string}): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    display({display: 'block'}),
    flexProp({flex: 'none'}),
    position({position: 'relative'}),
  )
}

/** @public */
export function _switch_element(): string | undefined {
  return input
}

/** @public */
export function _switchPresentation(): string | undefined {
  return presentation
}

/** @public */
export function _switchThumb(): string | undefined {
  return thumb
}

/** @public */
export function _switchTrack(): string | undefined {
  return track
}
