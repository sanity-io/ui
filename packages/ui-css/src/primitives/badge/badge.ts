import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {display} from '../../props/display/display'
import {elementTone} from '../../props/elementTone/elementTone'
import {flexProp} from '../../props/flex/flex'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {padding} from '../../props/padding/padding'
import {radius} from '../../props/radius/radius'
import {width} from '../../props/width/width'
import {root} from './badge.css'
import type {BadgeStyleProps} from './types'

/** @public */
export function badge(props: BadgeStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    elementTone({elementTone: props.tone}),
    display({display: 'flex'}),
    flexProp({flex: 'none'}),
    margin(props),
    maxWidth({maxWidth: 'fill'}),
    padding({
      ...props,
      padding: props.padding ?? 1,
      paddingX: props.paddingX ?? 2,
    }),
    radius({radius: props.radius ?? 'full'}),
    width({width: 'min'}),
  )
}
