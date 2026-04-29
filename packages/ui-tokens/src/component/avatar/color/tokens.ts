import {AVATAR_COLORS} from '../../../constants'
import {_defineTokenGroup} from '../../../lib/_defineTokenGroup'
import {_fromEntries} from '../../../lib/_fromEntries'
import {_colorAlias} from '../../../lib/color/_colorAlias'

/** @public */
export const avatarColorTokens = _fromEntries(
  AVATAR_COLORS.map((color) => [
    color,
    {
      avatar: {
        color: _defineTokenGroup({
          $type: 'color',
          bg: _colorAlias(`{_scheme.color.avatar.${color}.bg}`, {scopes: ['fill/frame']}),
          fg: _colorAlias(`{_scheme.color.avatar.${color}.fg}`, {scopes: ['fill/text']}),
        }),
      },
    } as const,
  ]),
)
