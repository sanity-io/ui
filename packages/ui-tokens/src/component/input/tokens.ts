import {_defineToken} from '../../lib/_defineToken'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_px} from '../../lib/_px'
import {_colorAlias} from '../../lib/color/_colorAlias'

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
    color: _defineTokenGroup({
      $type: 'color',
      boolean: {
        valid: {
          unchecked: {
            enabled: {
              bg: _colorAlias('{color.tinted.default.bg.0}'),
              border: _colorAlias('{color.tinted.default.border.2}'),
              fg: _colorAlias('{color.tinted.default.fg.0}'),
            },

            hovered: {
              bg: _colorAlias('{color.tinted.default.bg.0}'),
              border: _colorAlias('{color.tinted.default.border.4}'),
              fg: _colorAlias('{color.tinted.default.fg.0}'),
            },

            disabled: {
              bg: _colorAlias('{color.tinted.default.bg.1}'),
              border: _colorAlias('{color.tinted.default.border.0}'),
              fg: _colorAlias('{color.tinted.default.border.4}'),
            },
          },

          checked: {
            enabled: {
              bg: _colorAlias('{color.tinted.default.fg.0}'),
              border: _colorAlias('{color.tinted.default.fg.0}'),
              fg: _colorAlias('{color.tinted.default.bg.0}'),
            },
            hovered: {
              bg: _colorAlias('{color.tinted.default.fg.1}'),
              border: _colorAlias('{color.tinted.default.fg.1}'),
              fg: _colorAlias('{color.tinted.default.bg.0}'),
            },
            disabled: {
              bg: _colorAlias('{color.tinted.default.border.3}'),
              border: _colorAlias('{color.tinted.default.border.3}'),
              fg: _colorAlias('{color.tinted.default.bg.1}'),
            },
          },
        },

        invalid: {
          unchecked: {
            enabled: {
              bg: _colorAlias('{color.tinted.critical.bg.1}'),
              border: _colorAlias('{color.tinted.critical.border.2}'),
              fg: _colorAlias('{color.tinted.critical.fg.2}'),
            },

            hovered: {
              bg: _colorAlias('{color.tinted.critical.bg.1}'),
              border: _colorAlias('{color.tinted.critical.border.4}'),
              fg: _colorAlias('{color.tinted.critical.fg.2}'),
            },

            disabled: {
              bg: _colorAlias('{color.tinted.critical.bg.1}'),
              border: _colorAlias('{color.tinted.critical.border.0}'),
              fg: _colorAlias('{color.tinted.critical.border.3}'),
            },
          },

          checked: {
            enabled: {
              bg: _colorAlias('{color.tinted.critical.fg.2}'),
              border: _colorAlias('{color.tinted.critical.fg.2}'),
              fg: _colorAlias('{color.tinted.critical.bg.1}'),
            },
            hovered: {
              bg: _colorAlias('{color.tinted.critical.fg.1}'),
              border: _colorAlias('{color.tinted.critical.fg.1}'),
              fg: _colorAlias('{color.tinted.critical.bg.1}'),
            },
            disabled: {
              bg: _colorAlias('{color.tinted.critical.border.3}'),
              border: _colorAlias('{color.tinted.critical.border.3}'),
              fg: _colorAlias('{color.tinted.critical.bg.1}'),
            },
          },
        },
      },

      valid: {
        enabled: {
          bg: _colorAlias('{color.tinted.default.bg.0}'),
          border: _colorAlias('{color.tinted.default.border.1}'),
          fg: _colorAlias('{color.tinted.default.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.default.bg.1}'),
            fg: _colorAlias('{color.tinted.default.fg.4}'),
          },
        },

        hovered: {
          bg: _colorAlias('{color.tinted.default.bg.0}'),
          border: _colorAlias('{color.tinted.default.border.4}'),
          fg: _colorAlias('{color.tinted.default.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.default.bg.1}'),
            fg: _colorAlias('{color.tinted.default.fg.4}'),
          },
        },

        disabled: {
          bg: _colorAlias('{color.tinted.default.bg.1}'),
          border: _colorAlias('{color.tinted.default.border.0}'),
          fg: _colorAlias('{color.tinted.default.border.3}'),
          muted: {
            bg: _colorAlias('{color.tinted.default.bg.2}'),
            fg: _colorAlias('{color.tinted.default.border.2}'),
          },
        },
      },

      invalid: {
        enabled: {
          bg: _colorAlias('{color.tinted.critical.bg.1}'),
          border: _colorAlias('{color.tinted.critical.border.1}'),
          fg: _colorAlias('{color.tinted.critical.fg.4}'),
          muted: {
            bg: _colorAlias('{color.tinted.critical.bg.2}'),
            fg: _colorAlias('{color.tinted.critical.fg.4}'),
          },
        },

        hovered: {
          bg: _colorAlias('{color.tinted.critical.bg.1}'),
          border: _colorAlias('{color.tinted.critical.border.4}'),
          fg: _colorAlias('{color.tinted.critical.fg.0}'),
          muted: {
            bg: _colorAlias('{color.tinted.critical.bg.2}'),
            fg: _colorAlias('{color.tinted.critical.fg.4}'),
          },
        },

        disabled: {
          bg: _colorAlias('{color.tinted.critical.bg.1}'),
          border: _colorAlias('{color.tinted.critical.border.0}'),
          fg: _colorAlias('{color.tinted.critical.border.3}'),
          muted: {
            bg: _colorAlias('{color.tinted.critical.bg.2}'),
            fg: _colorAlias('{color.tinted.critical.border.2}'),
          },
        },
      },
    }),
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
