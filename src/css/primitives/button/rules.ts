import {THEME_COLOR_BUTTON_MODES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import {Rules} from '../../types'

export const buttonRules: Rules = {
  'button': {
    WebkitFontSmoothing: 'inherit',
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    font: 'inherit',
    outline: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    border: 0,
    boxSizing: 'border-box',
    padding: 0,
    overflow: 'hidden',
    margin: 0,
    textAlign: 'left',
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--card-fg-color)',
  },

  // variants
  ...THEME_COLOR_BUTTON_MODES.reduce((acc, mode) => {
    return {
      ...acc,
      [`button-mode-${mode}`]: {
        '@nest': THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
          return {
            ...acc,
            [`&.button-tone-${tone}`]: {
              '--card-bg-color': `var(--card-button-${mode}-${tone}-enabled-bg-color, rgba(127, 127, 127, 0.1))`,
              '--card-fg-color': `var(--card-button-${mode}-${tone}-enabled-fg-color, currentColor)`,
            },
          }
        }, {} as Rules),
      },
    }
  }, {} as Rules),

  'button-loading-box': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'var(--card-bg-color)',
    borderRadius: 'inherit',
    zIndex: 1,
    // boxShadow: 'inherit',
  },
}
