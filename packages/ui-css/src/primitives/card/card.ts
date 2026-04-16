import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {bgPattern} from '../../props/bgPattern/bgPattern'
import {cardTone} from '../../props/cardTone/cardTone'
import {colorScheme} from '../../props/colorScheme/colorScheme'
import {cardVarsClassName} from '../../vars/component/card.css'
import {elementToneClassNames} from '../../vars/context/element/tone.css'
import {shadowVarsClassName} from '../../vars/primitive/shadow.css'
import {colorVarsClassName} from '../../vars/semantic/color.css'
import {box} from '../box/box'
import {root} from './card.css'
import type {CardStyleProps} from './types'

/** @public */
export function card(props: CardStyleProps): string | undefined {
  const {className, scheme, tone, ...rest} = props

  return _composeClassNames(
    className,
    root,
    scheme && colorScheme({colorScheme: scheme}),
    tone && cardTone({cardTone: tone}),
    tone && cardVarsClassName,
    tone && colorVarsClassName,
    tone && elementToneClassNames.default,
    tone && shadowVarsClassName,
    bgPattern({bgPattern: rest.__unstable_pattern}),
    box(rest),
  )
}
