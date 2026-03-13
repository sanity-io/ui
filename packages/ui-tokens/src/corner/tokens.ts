import {_defineToken} from '../lib/_defineToken'
import {_defineTokens} from '../lib/_defineTokens'

/** @public */
export const cornerTokens = _defineTokens({
  corner: {
    shape: {
      squircle: _defineToken({
        $type: 'number',
        $value: 1.36,
        $extensions: {
          'io.sanity': {
            scopes: ['corner/shape'],
          },
        },
      }),
    },
  },
})
