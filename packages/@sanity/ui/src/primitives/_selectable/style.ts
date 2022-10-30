import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {SelectableTone} from '../../types/selectable'

/**
 * @internal
 */
export interface SelectableStyleProps {
  $tone: SelectableTone
}

export function selectableBaseStyle(): CSSObject {
  return {
    backgroundColor: 'inherit',
    color: 'inherit',

    '&[data-as="button"]': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      outline: 'none',
      font: 'inherit',
      textAlign: 'inherit',
      border: 0,
      width: 'stretch',
    },

    /* &:is(a) */
    '&[data-as="a"]': {
      textDecoration: 'none',
    },
  }
}

export function selectableColorStyle(props: SelectableStyleProps & ThemeProps): CSSObject {
  const {$tone, theme} = props
  const {base, muted, selectable} = theme.sanity.color
  // @todo: remove use of `muted` here
  const tone = selectable ? selectable[$tone] || selectable.default : muted[$tone] || muted.default

  return {
    ..._colorVarsStyle(base, tone.enabled),

    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--card-fg-color)',
    outline: 'none',

    /* &:is(button) */
    '&[data-as="button"]': {
      '&:disabled': {
        ..._colorVarsStyle(base, tone.disabled),
      },

      '&:not(:disabled)': {
        '&[aria-pressed="true"]': {
          ..._colorVarsStyle(base, tone.pressed),
        },

        '&[data-selected], &[aria-selected="true"] > &': {
          ..._colorVarsStyle(base, tone.selected),
        },

        '@media (hover: hover)': {
          '&:not([data-selected])': {
            '&:hover': {
              ..._colorVarsStyle(base, tone.hovered),
            },

            '&:active': {
              ..._colorVarsStyle(base, tone.pressed),
            },
          },
        },
      },
    },

    /* &:is(a) */
    '&[data-as="a"]': {
      '&[data-disabled]': {
        ..._colorVarsStyle(base, tone.disabled),
      },

      '&:not([data-disabled])': {
        '&[data-pressed]': {
          ..._colorVarsStyle(base, tone.pressed),
        },

        '&[data-selected]': {
          ..._colorVarsStyle(base, tone.selected),
        },

        '@media (hover: hover)': {
          '&:not([data-selected])': {
            '&:hover': {
              ..._colorVarsStyle(base, tone.hovered),
            },

            '&:active': {
              ..._colorVarsStyle(base, tone.pressed),
            },
          },
        },
      },
    },

    ...theme.sanity.styles?.card?.root,
  }
}
