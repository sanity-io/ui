/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {paletteVarsClassName} from '../vars/palette.css'

// 1 - core
// import {_coreVarsClassName} from '../vars/_core.css'

// vars
import {avatarVarsClassName} from '../vars/avatar.css'
import {borderVarsClassName} from '../vars/border.css'
import {colorVarsClassName} from '../vars/color.css'
import {containerVarsClassName} from '../vars/container.css'
import {cornerVarsClassName} from '../vars/corner.css'
import {focusVarsClassName} from '../vars/focus.css'
import {fontVarsClassName} from '../vars/font.css'
import {radiusVarsClassName} from '../vars/radius.css'
import {shadowVarsClassName} from '../vars/shadow.css'
import {spaceVarsClassName} from '../vars/space.css'

// components
// import {buttonVarsClassName} from '../vars/button.css'
import {cardVarsClassName} from '../vars/card.css'
// import {inputVarsClassName} from '../vars/input.css'
// import {selectableVarsClassName} from '../primitives/selectable/selectable.css'

// props
import {bgPattern} from '../props/bgPattern/bgPattern'
import {cardTone} from '../props/cardTone/cardTone'
import {colorScheme} from '../props/colorScheme/colorScheme'
import {elementTone} from '../props/elementTone/elementTone'
import {margin} from '../props/margin/margin'
import {height} from '../props/height/height'
import type {HeightStyleProps} from '../props/height/types'

// primitives
import {box} from '../primitives/box/box'
import {root as cardRoot} from '../primitives/card/card.css'

// root
import {_root} from './root.css'

// lib
import {_composeClassNames} from '../lib/class-names/_composeClassNames'
import type {RootStyleProps} from './types'

/** @public */
export function root(props: RootStyleProps): string | undefined {
  const {scheme, tone, ...rest} = props

  return _composeClassNames(
    props.className,
    paletteVarsClassName,
    // _coreVarsClassName,

    colorScheme({colorScheme: scheme}),
    cardTone({cardTone: tone}),
    elementTone({elementTone: 'default'}),
    // elementToneClassNames.default,

    avatarVarsClassName,
    borderVarsClassName,
    // buttonVarsClassName,
    // cardVarsClassName,
    colorVarsClassName,
    containerVarsClassName,
    cornerVarsClassName,
    focusVarsClassName,
    fontVarsClassName,
    radiusVarsClassName,
    shadowVarsClassName,
    spaceVarsClassName,

    _root,
    cardRoot,
    cardVarsClassName,
    // inputVarsClassName,
    // selectableVarsClassName,

    bgPattern({bgPattern: rest.__unstable_pattern}),
    box(rest),
  )
}

/** @public */
export function root_body(props: HeightStyleProps) {
  return _composeClassNames(height(props), margin({margin: 0}))
}
