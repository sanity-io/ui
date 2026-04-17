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
          _colorAlias(`{color._colorScheme.code.token.${key}}`, {
            // scopes: ['fill/text'],
            // NOTE: hide in figma for now
            scopes: [],
          }),
        ]),
      ),
    },
  },
})
