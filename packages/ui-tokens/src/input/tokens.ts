import {_defineToken} from '../lib/_defineToken'
import {_defineTokens} from '../lib/_defineTokens'
import {_px} from '../lib/_px'

/** @public */
export const inputTokens = _defineTokens({
  input: {
    border: {
      width: _defineToken({
        $type: 'dimension',
        $value: '{border.2}',
      }),
    },
    checkbox: {
      size: _defineToken({$type: 'dimension', ..._px(17)}),
      focusRing: _defineToken({
        $type: 'shadow',
        $value: '{focus.ring.default}',
      }),
    },
    radio: {
      size: _defineToken({$type: 'dimension', ..._px(17)}),
      markSize: _defineToken({$type: 'dimension', ..._px(9)}),
      focusRing: _defineToken({
        $type: 'shadow',
        $value: '{focus.ring.default}',
      }),
    },
    select: {
      focusRing: _defineToken({
        $type: 'shadow',
        $value: '{focus.ring.default}',
      }),
    },
    switch: {
      width: _defineToken({$type: 'dimension', ..._px(25)}),
      height: _defineToken({$type: 'dimension', ..._px(17)}),
      padding: _defineToken({$type: 'dimension', ..._px(4)}),
      focusRing: _defineToken({
        $type: 'shadow',
        $value: '{focus.ring.default}',
      }),
      transitionDurationMs: _defineToken({$type: 'duration', $value: {value: 150, unit: 'ms'}}),
      transitionTimingFunction: _defineToken({$type: 'string', $value: 'ease-out'}),
    },
    text: {
      focusRing: _defineToken({
        $type: 'shadow',
        $value: '{focus.ring.default}',
      }),
    },
  },
})
