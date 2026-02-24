/* eslint-disable simple-import-sort/imports */

// 0 - palette
import {_paletteVars} from './system/_palette.css'

// 1 - core
import {_coreVars} from './system/_core.css'

// 2 - color scheme
import {_colorSchemeVars} from './system/_colorScheme.css'

// 3 - card tone
import {_cardToneVars} from './system/_cardTone.css'

// rest
import {avatarVars} from './system/avatar.css'
import {borderVars} from './system/border.css'
import {buttonVars} from './system/button.css'
import {cardVars} from './system/card.css'
import {colorVars} from './system/color.css'
import {containerVars} from './system/container.css'
import {cornerVars} from './system/corner.css'
import {focusRingVars} from './system/focusRing.css'
import {fontVars} from './system/font.css'
import {inputVars} from './system/input.css'
import {radiusVars} from './system/radius.css'
import {shadowVars} from './system/shadow.css'
import {spaceVars} from './system/space.css'

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
  /**
   * @internal
   * @deprecated Prefer using semantic color tokens instead.
   */
  palette: _paletteVars,

  avatar: avatarVars,
  border: borderVars,
  button: buttonVars,
  card: cardVars,
  color: colorVars,
  container: containerVars,
  corner: cornerVars,
  focusRing: focusRingVars,
  font: fontVars,
  input: inputVars,
  radius: radiusVars,
  shadow: shadowVars,
  space: spaceVars,
}
