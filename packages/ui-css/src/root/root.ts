/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {paletteVarsClassName} from '../vars/palette.css'

// 1 - core
// import {_coreVarsClassName} from '../vars/_core.css'

// rest
import {avatarVarsClassName} from '../vars/avatar.css'
import {borderVarsClassName} from '../vars/border.css'
import {buttonVarsClassName} from '../vars/button.css'
import {cardVarsClassName} from '../vars/card.css'
import {colorVarsClassName} from '../vars/color.css'
import {containerVarsClassName} from '../vars/container.css'
import {cornerVarsClassName} from '../vars/corner.css'
import {focusVarsClassName} from '../vars/focus.css'
import {fontVarsClassName} from '../vars/font.css'
import {inputVarsClassName} from '../vars/input.css'
import {radiusVarsClassName} from '../vars/radius.css'
import {shadowVarsClassName} from '../vars/shadow.css'
import {spaceVarsClassName} from '../vars/space.css'

import {_composeClassNames} from '../lib/class-names/_composeClassNames'
import {_root} from './root.css'
import type {RootStyleProps} from './types'
import {colorScheme} from '../props/colorScheme/colorScheme'
import {box} from '../primitives/box/box'
import {margin} from '../props/margin/margin'
import {root as cardRoot} from '../primitives/card/card.css'
import {selectableVarsClassName} from '../primitives/selectable/selectable.css'
import {bgPattern} from '../props/bgPattern/bgPattern'
import {cardTone} from '../props/cardTone/cardTone'
import {height} from '../props/height/height'
import type {HeightStyleProps} from '../props/height/types'

/** @public */
export function root(props: RootStyleProps): string | undefined {
  const {scheme, tone, ...rest} = props

  return _composeClassNames(
    props.className,
    paletteVarsClassName,
    // _coreVarsClassName,

    colorScheme({colorScheme: scheme}),
    cardTone({cardTone: tone}),

    avatarVarsClassName,
    borderVarsClassName,
    buttonVarsClassName,
    cardVarsClassName,
    colorVarsClassName,
    containerVarsClassName,
    cornerVarsClassName,
    focusVarsClassName,
    fontVarsClassName,
    inputVarsClassName,
    radiusVarsClassName,
    selectableVarsClassName,
    shadowVarsClassName,
    spaceVarsClassName,

    _root,
    cardRoot,

    bgPattern({bgPattern: rest.__unstable_pattern}),
    box(rest),
  )
}

/** @public */
export function root_body(props: HeightStyleProps) {
  return _composeClassNames(height(props), margin({margin: 0}))
}
