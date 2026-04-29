import {_CODE_TOKEN_KEYS} from '../../constants'
import {_defineTokens} from '../../lib/_defineTokens'
import {_fromEntries} from '../../lib/_fromEntries'
import {_colorAlias} from '../../lib/color/_colorAlias'

export const codeTokens = _defineTokens({
  code: {
    color: {
      $type: 'color',
      token: _fromEntries(
        _CODE_TOKEN_KEYS.map((key) => [
          key,
          _colorAlias(`{_scheme.color.code.token.${key}}`, {
            // scopes: ['fill/text'],
            scopes: [], // NOTE: hide in figma for now
          }),
        ]),
      ),
    },
  },
})
