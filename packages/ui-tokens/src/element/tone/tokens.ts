import {_colorAlias} from '../../color/lib/_colorAlias'
import {COLOR_VARIANTS, ELEMENT_TONES} from '../../constants'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_fromEntries} from '../../lib/_fromEntries'

/** @public */
export const elementToneTokens = {
  ..._fromEntries(
    ELEMENT_TONES.map((t) => [
      t,
      _defineTokens({
        color: _defineTokenGroup({
          $type: 'color',
          ..._fromEntries(
            COLOR_VARIANTS.map((v) => [
              v,
              {
                bg: {
                  0: _colorAlias(`{color._cardTone.${v}.${t}.bg.0}`, {
                    scopes: ['fill/frame'],
                  }),
                  1: _colorAlias(`{color._cardTone.${v}.${t}.bg.1}`, {
                    scopes: ['fill/frame'],
                  }),
                  2: _colorAlias(`{color._cardTone.${v}.${t}.bg.2}`, {
                    scopes: ['fill/frame'],
                  }),
                  3: _colorAlias(`{color._cardTone.${v}.${t}.bg.3}`, {
                    scopes: ['fill/frame'],
                  }),
                  4: _colorAlias(`{color._cardTone.${v}.${t}.bg.4}`, {
                    scopes: ['fill/frame'],
                  }),
                },
                border: {
                  0: _colorAlias(`{color._cardTone.${v}.${t}.border.0}`, {
                    scopes: ['stroke/color'],
                  }),
                  1: _colorAlias(`{color._cardTone.${v}.${t}.border.1}`, {
                    scopes: ['stroke/color'],
                  }),
                  2: _colorAlias(`{color._cardTone.${v}.${t}.border.2}`, {
                    scopes: ['stroke/color'],
                  }),
                  3: _colorAlias(`{color._cardTone.${v}.${t}.border.3}`, {
                    scopes: ['stroke/color'],
                  }),
                  4: _colorAlias(`{color._cardTone.${v}.${t}.border.4}`, {
                    scopes: ['stroke/color'],
                  }),
                },
                fg: {
                  0: _colorAlias(`{color._cardTone.${v}.${t}.fg.0}`, {scopes: ['fill/text']}),
                  1: _colorAlias(`{color._cardTone.${v}.${t}.fg.1}`, {scopes: ['fill/text']}),
                  2: _colorAlias(`{color._cardTone.${v}.${t}.fg.2}`, {scopes: ['fill/text']}),
                  3: _colorAlias(`{color._cardTone.${v}.${t}.fg.3}`, {scopes: ['fill/text']}),
                  4: _colorAlias(`{color._cardTone.${v}.${t}.fg.4}`, {scopes: ['fill/text']}),
                },
              },
            ]),
          ),
        }),
      }),
    ]),
  ),
}
