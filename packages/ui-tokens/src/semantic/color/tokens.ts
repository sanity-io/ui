import {_CODE_TOKEN_KEYS} from '../../constants'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_fromEntries} from '../../lib/_fromEntries'
import {_colorAlias} from '../../lib/color/_colorAlias'

/** @public */
export const colorTokens = _defineTokens({
  color: _defineTokenGroup({
    $type: 'color',
    backdrop: _colorAlias('{color._cardTone.backdrop}', {scopes: ['fill/shape']}),
    bg: _colorAlias('{color._cardTone.tinted.default.bg.0}', {
      scopes: ['effect/color', 'fill/frame', 'fill/shape'],
    }),
    border: _colorAlias('{color._cardTone.tinted.default.border.2}', {scopes: ['stroke/color']}),
    code: {
      token: _fromEntries(
        _CODE_TOKEN_KEYS.map((key) => [
          key,
          _colorAlias(`{color._cardTone.code.token.${key}}`, {
            // scopes: ['fill/text'],
            // NOTE: hide in figma for now
            scopes: [],
          }),
        ]),
      ),
    },
    fg: _colorAlias('{color._cardTone.tinted.default.fg.0}', {scopes: ['fill/text']}),
    focusRing: _colorAlias('{color._cardTone.focusRing}', {scopes: ['effect/color']}),
    link: {
      fg: _colorAlias('{color._cardTone.link.fg}', {scopes: ['fill/text']}),
    },
    muted: {
      bg: _colorAlias('{color._cardTone.tinted.default.bg.1}', {scopes: ['fill/frame']}),
      border: _colorAlias('{color._cardTone.tinted.default.border.1}', {scopes: ['stroke/color']}),
      fg: _colorAlias('{color._cardTone.tinted.default.fg.4}', {scopes: ['fill/text']}),
    },
    shadow: {
      outline: _colorAlias('{color._cardTone.shadow.outline}', {scopes: ['effect/color']}),
      umbra: _colorAlias('{color._cardTone.shadow.umbra}', {scopes: ['effect/color']}),
      penumbra: _colorAlias('{color._cardTone.shadow.penumbra}', {scopes: ['effect/color']}),
      ambient: _colorAlias('{color._cardTone.shadow.ambient}', {scopes: ['effect/color']}),
    },
    skeleton: {
      from: _colorAlias('{color._cardTone.tinted.default.bg.3}', {scopes: ['fill/frame']}),
      to: _colorAlias('{color._cardTone.tinted.default.bg.2}', {scopes: ['fill/frame']}),
    },
  }),
})
