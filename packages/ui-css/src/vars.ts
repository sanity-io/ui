/* eslint-disable simple-import-sort/imports */

// NOTE: order matters for CSS

// color primitive vars
import {paletteVars} from './vars/primitive/color/palette.css'

// color vars
import './vars/build/color/_scheme.css'

// context
import './vars/context/card/_tone.css'
import {elementToneVars} from './vars/context/element/tone.css'

// semantic color vars
import {colorVars} from './vars/semantic/color.css'

// primitive vars
import {fontVars} from './vars/primitive/font.css'
import {radiusVars} from './vars/primitive/radius.css'
import {shadowVars} from './vars/primitive/shadow.css'
import {spaceVars} from './vars/primitive/space.css'

// decision vars
import {borderVars} from './vars/decision/border.css'
import {containerVars} from './vars/decision/container.css'
import {cornerVars} from './vars/decision/corner.css'
import {focusVars} from './vars/decision/focus.css'

// component vars
import {avatarVars} from './vars/component/avatar.css'
import {buttonVars} from './vars/component/button.css'
import {cardVars} from './vars/component/card.css'
import {inputVars} from './vars/component/input.css'
import {selectableVars} from './vars/component/selectable.css'
import {avatarColorVars} from './vars/component/avatar/color.css'
import {codeVars} from './vars/component/code.css'
import {booleanColorVars} from './vars/component/boolean/color.css'
import {inputColorVars} from './vars/component/input/color.css'
import {buttonSlotVars} from './vars/component/button/slots.css'
import {inputSlotVars} from './vars/component/input/slots.css'
import {avatarSlotVars} from './vars/component/avatar/slots.css'
import {badgeSlotVars} from './vars/component/badge/slots.css'
import {skeletonSlotVars} from './vars/component/skeleton/slots.css'
import {fontSlotVars} from './vars/primitive/font/slots.css'

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
    ...paletteVars.color,
    ...colorVars.color,
    ...elementToneVars.color,
  },

  // the primitive tokens
  font: {
    ...fontVars.font,
    ...fontSlotVars.font,
  },
  ...radiusVars,
  ...shadowVars,
  ...spaceVars,

  // decision tokens
  ...borderVars,
  ...containerVars,
  ...cornerVars,
  ...focusVars,

  // component tokens
  avatar: {
    ...avatarVars.avatar,
    ...avatarColorVars.avatar,
    ...avatarSlotVars.avatar,
  },
  badge: {
    ...badgeSlotVars.badge,
  },
  boolean: {
    ...booleanColorVars.boolean,
  },
  button: {
    ...buttonVars.button,
    color: {
      ...buttonModeVars.button.color,
      ...buttonSlotVars.button.color,
    },
  },
  ...cardVars,
  ...codeVars,
  input: {
    ...inputVars.input,
    ...inputColorVars.input,
    ...inputSlotVars.input,
    color: {
      ...inputColorVars.input.color,
      ...inputSlotVars.input.color,
    },
  },
  ...selectableVars,
  skeleton: {
    ...skeletonSlotVars.skeleton,
  },
}
