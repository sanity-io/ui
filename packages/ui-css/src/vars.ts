/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {paletteVars} from './vars/palette.css'

// 1 - color scheme
import {_colorSchemeVars} from './vars/color/scheme.css'

// 2 - card tone
import {_cardToneVars} from './vars/card/tone.css'

// 3 - semantic color
import {colorVars} from './vars/color.css'

// 4 - element tone
import {elementToneVars} from './vars/element/tone.css'

// 5 - other primitives
import {avatarVars} from './vars/avatar.css'
import {borderVars} from './vars/border.css'
import {containerVars} from './vars/container.css'
import {cornerVars} from './vars/corner.css'
import {focusVars} from './vars/focus.css'
import {fontVars} from './vars/font.css'
import {radiusVars} from './vars/radius.css'
import {shadowVars} from './vars/shadow.css'
import {spaceVars} from './vars/space.css'

// 6 - components
import {buttonVars} from './vars/button.css'
import {cardVars} from './vars/card.css'
import {inputVars} from './vars/input.css'
import {selectableVars} from './vars/selectable.css'

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
