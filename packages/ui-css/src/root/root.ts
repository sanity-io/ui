/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {_paletteVarsClassName} from '../system/_palette.css'

// 1 - core
import {_coreVarsClassName} from '../system/_core.css'

// rest
import {avatarVarsClassName} from '../system/avatar.css'
import {borderVarsClassName} from '../system/border.css'
import {buttonVarsClassName} from '../system/button.css'
import {cardVarsClassName} from '../system/card.css'
import {colorVarsClassName} from '../system/color.css'
import {containerVarsClassName} from '../system/container.css'
import {cornerVarsClassName} from '../system/corner.css'
import {focusRingVarsClassName} from '../system/focusRing.css'
import {fontVarsClassName} from '../system/font.css'
import {inputVarsClassName} from '../system/input.css'
import {radiusVarsClassName} from '../system/radius.css'
import {shadowVarsClassName} from '../system/shadow.css'
import {spaceVarsClassName} from '../system/space.css'

import {_composeClassNames} from '../_composeClassNames'
import {_root} from './root.css'
import type {RootStyleProps} from './types'
import {colorScheme} from '../props/colorScheme/colorScheme'
import {box} from '../primitives/box/box'
import {root as cardRoot} from '../primitives/card/card.css'
import {selectableVarsClassName} from '../primitives/selectable/selectable.css'
import {bgPattern} from '../props/bgPattern/bgPattern'
import {cardTone} from '../props/cardTone/cardTone'

/** @public */
export function root(props: RootStyleProps): string | undefined {
  const {scheme, tone, ...rest} = props

  return _composeClassNames(
    props.className,
    _paletteVarsClassName,
    _coreVarsClassName,

    colorScheme({colorScheme: scheme}),
    cardTone({cardTone: tone}),

    avatarVarsClassName,
    borderVarsClassName,
    buttonVarsClassName,
    cardVarsClassName,
    colorVarsClassName,
    containerVarsClassName,
    cornerVarsClassName,
    focusRingVarsClassName,
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
