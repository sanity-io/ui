import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {bgPattern} from '../../props/bgPattern/bgPattern'
import {cardTone} from '../../props/cardTone/cardTone'
import {colorScheme} from '../../props/colorScheme/colorScheme'
import {colorVarsClassName} from '../../vars/color.css'
import {shadowVarsClassName} from '../../vars/shadow.css'
import {box} from '../box/box'
// import {root as selectableRoot, selectableVarsClassName} from '../selectable/selectable.css'
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
    tone && colorVarsClassName,
    tone && shadowVarsClassName,
    bgPattern({bgPattern: rest.__unstable_pattern}),

    // // TODO: reconsider this, feels wrong
    // selectableRoot,
    // selectableVarsClassName,

    box(rest),
  )
}
