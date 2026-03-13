/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {paletteVars} from './vars/palette.css'

// // 1 - core
// import {_coreVars} from './vars/_core.css'

// 2 - color scheme
import {_colorSchemeVars} from './vars/_colorScheme.css'

// 3 - card tone
import {_cardToneVars} from './vars/_cardTone.css'

// rest
import {avatarVars} from './vars/avatar.css'
import {borderVars} from './vars/border.css'
import {buttonVars} from './vars/button.css'
import {cardVars} from './vars/card.css'
import {colorVars} from './vars/color.css'
import {containerVars} from './vars/container.css'
import {cornerVars} from './vars/corner.css'
import {focusVars} from './vars/focus.css'
import {fontVars} from './vars/font.css'
import {inputVars} from './vars/input.css'
import {radiusVars} from './vars/radius.css'
import {shadowVars} from './vars/shadow.css'
import {spaceVars} from './vars/space.css'

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
 * @see {@link https://www.sanity.io/docs/ui/tokens/overview} - Design tokens documentation
 *
 * @public
 */
export const vars = {
  color: {
    ...paletteVars.color,
    ..._colorSchemeVars.color,
    ..._cardToneVars.color,
    ...colorVars.color,
  },

  ...avatarVars,
  ...borderVars,
  ...buttonVars,
  ...cardVars,
  ...containerVars,
  ...cornerVars,
  ...focusVars,
  ...fontVars,
  ...inputVars,
  ...radiusVars,
  ...shadowVars,
  ...spaceVars,
}
