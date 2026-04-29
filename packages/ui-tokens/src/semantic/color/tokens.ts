import {_CODE_TOKEN_KEYS} from '../../constants'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_fromEntries} from '../../lib/_fromEntries'
import {_colorAlias} from '../../lib/color/_colorAlias'

/** @public */
export const colorTokens = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    backdrop: _colorAlias('{_tone.color.backdrop}', {scopes: ['fill/shape']}),
    bg: _colorAlias('{_tone.color.tinted.default.bg.0}', {
      scopes: ['effect/color', 'fill/frame', 'fill/shape'],
    }),
    border: _colorAlias('{_tone.color.tinted.default.border.2}', {scopes: ['stroke/color']}),
    fg: _colorAlias('{_tone.color.tinted.default.fg.0}', {scopes: ['fill/text']}),
    focusRing: _colorAlias('{_tone.color.focusRing}', {scopes: ['effect/color']}),
    link: {
      fg: _colorAlias('{_tone.color.link.fg}', {scopes: ['fill/text']}),
    },
    muted: {
      bg: _colorAlias('{_tone.color.tinted.default.bg.1}', {scopes: ['fill/frame']}),
      border: _colorAlias('{_tone.color.tinted.default.border.1}', {scopes: ['stroke/color']}),
      fg: _colorAlias('{_tone.color.tinted.default.fg.4}', {scopes: ['fill/text']}),
    },
    shadow: {
      outline: _colorAlias('{_tone.color.shadow.outline}', {scopes: ['effect/color']}),
      umbra: _colorAlias('{_tone.color.shadow.umbra}', {scopes: ['effect/color']}),
      penumbra: _colorAlias('{_tone.color.shadow.penumbra}', {scopes: ['effect/color']}),
      ambient: _colorAlias('{_tone.color.shadow.ambient}', {scopes: ['effect/color']}),
    },
    skeleton: {
      from: _colorAlias('{_tone.color.tinted.default.bg.3}', {scopes: ['fill/frame']}),
      to: _colorAlias('{_tone.color.tinted.default.bg.2}', {scopes: ['fill/frame']}),
    },
  }),
})
