import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {alignItems} from '../../props/alignItems/alignItems'
import {display} from '../../props/display/display'
import {elementTone} from '../../props/elementTone/elementTone'
import {flexProp} from '../../props/flex/flex'
import {gap} from '../../props/gap/gap'
import {justifyContent} from '../../props/justifyContent/justifyContent'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {padding} from '../../props/padding/padding'
import {radius} from '../../props/radius/radius'
import {width} from '../../props/width/width'
import {loadingBox, root} from './button.css'
import {_buttonMode} from './buttonMode.css'
import type {ButtonStyleProps} from './types'

/** @public */
export function button(props: ButtonStyleProps): string | undefined {
  const {className, mode = 'default', tone, ...rest} = props

  return _composeClassNames(
    className,
    _buttonMode[mode],
    root,
    elementTone({elementTone: tone}),
    alignItems({alignItems: rest.alignItems ?? 'center'}),
    display({display: 'flex'}),
    flexProp(rest),
    justifyContent({justifyContent: rest.justify ?? 'center'}),
    gap({...rest, gap: rest.gap ?? rest.padding ?? 3}),
    maxWidth(rest),
    padding({...rest, padding: rest.padding ?? 3}),
    radius({radius: rest.radius ?? 2}),
    width(rest),
  )
}

/** @public */
export function button_loadingBox(): string {
  return loadingBox
}
