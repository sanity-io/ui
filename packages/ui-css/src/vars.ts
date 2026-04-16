/* eslint-disable simple-import-sort/imports */

// 0 - palette

// 1 - color scheme
import {paletteVars} from './vars/primitive/color/palette.css'

// 2 - card tone
import {_colorSchemeVars} from './vars/build/color/scheme.css'

// 3 - semantic color
import {_cardToneVars} from './vars/context/card/tone.css'
import {elementToneVars} from './vars/context/element/tone.css'

// 4 - element tone
import {fontVars} from './vars/primitive/font.css'
import {radiusVars} from './vars/primitive/radius.css'
import {shadowVars} from './vars/primitive/shadow.css'
import {spaceVars} from './vars/primitive/space.css'

// 5 - other primitives
import {borderVars} from './vars/decision/border.css'
import {containerVars} from './vars/decision/container.css'
import {cornerVars} from './vars/decision/corner.css'
import {focusVars} from './vars/decision/focus.css'

// 6 - components
import {colorVars} from './vars/semantic/color.css'
import {avatarVars} from './vars/component/avatar.css'
import {buttonVars} from './vars/component/button.css'
import {cardVars} from './vars/component/card.css'
import {inputVars} from './vars/component/input.css'
import {selectableVars} from './vars/component/selectable.css'

/**
 * CSS custom properties (CSS variables) for the Sanity UI design system.
 *
 * @remarks
 * This object provides access to all design tokens as CSS variables wrapped in `var()` calls.
 * Use these tokens to build components that automatically adapt to color schemes,
 * card tones, and other contextual design system states.
 *
 * @example
 * Using with vanilla-extract's style function:
 * ```tsx
 * import {style} from '@vanilla-extract/css'
 * import {vars} from '@sanity/ui-css'
 *
 * export const card = style({
 *   background: vars.color.bg,
 *   border: `1px solid ${vars.color.border}`,
 *   borderRadius: vars.radius[3],
 *   boxShadow: vars.shadow[2],
 * })
 * ```
 *
 * @public
 */
export const vars = {
  color: {
    // primitive color tokens
    ...paletteVars.color,

    ..._colorSchemeVars.color, // internal
    ..._cardToneVars.color, // internal

    // semantic color tokens
    ...colorVars.color,
    ...elementToneVars.color,
    tinted: {
      ...colorVars.color.tinted,
      ...elementToneVars.color.tinted,
    },
    solid: {
      ...colorVars.color.solid,
      ...elementToneVars.color.solid,
    },
  },

  // the primitive tokens
  ...avatarVars,
  ...borderVars,
  ...containerVars,
  ...cornerVars,
  ...focusVars,
  ...fontVars,
  ...radiusVars,
  ...shadowVars,
  ...spaceVars,

  // component tokens
  ...buttonVars,
  ...cardVars,
  ...inputVars,
  ...selectableVars,
}
