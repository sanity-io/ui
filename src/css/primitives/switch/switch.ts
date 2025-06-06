import {_composeClassNames} from '../../_composeClassNames'
import {input, presentation, root, thumb, track} from './switch.css'

/** @public */
export function _switch(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}

/** @public */
export function _switchElement(): string | undefined {
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
