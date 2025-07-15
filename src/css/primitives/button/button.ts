import {_composeClassNames} from '../../_composeClassNames'
import {display} from '../../props/display/display'
import {flex} from '../../props/flex/flex'
import {radius} from '../../props/radius/radius'
import {width} from '../../props/width/width'
import {loadingBox, modes, root, tones} from './button.css'
import type {ButtonStyleProps} from './types'

/** @public */
export function button(props: ButtonStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    modes[props.mode ?? 'default'],
    tones[props.tone ?? 'default'],
    display({display: 'flex'}),
    flex(props),
    radius(props),
    width(props),
  )
}

/** @public */
export function buttonLoadingBox(): string {
  return loadingBox
}
