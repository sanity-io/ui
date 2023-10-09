import {ColorTints, hues} from '@sanity/color'
import {ThemeColorName} from '../types'
import {createCssVars} from './createCssVars'

export const tones: Record<ThemeColorName, ColorTints> = {
  default: hues.gray,
  transparent: hues.gray,
  primary: hues.gray,
  positive: hues.cyan,
  caution: hues.yellow,
  critical: hues.red,
} as const

describe('css variables', () => {
  it('Should create the variables when no default tone is provided', () => {
    const result = createCssVars('light', tones)
    const expected = {
      '--default-text_primary': '#272a2e',
      '--default-text_secondary': '#6e7683',
      '--default-text_inactive': '#8690a0',
      '--default-bg_base': '#fff',
      '--default-bg_base_hover': '#f2f3f5',
      '--default-bg_base_active': '#e6e8ec',
      '--default-bg_accent': '#272a2e',
      '--default-bg_accent_hover': '#1b1d20',
      '--default-bg_accent_active': '#101112',
      '--default-bg_tint': '#f2f3f5',
      '--default-icon_default': '#8690a0',
      '--default-icon_inverted': '#fff',
      '--default-border_base': '#e6e8ec',
      '--default-border_base_hover': '#ced2d9',
      '--default-border_accent': '#6e7683',
      '--default-border_accent_inverted': '#fff',
      '--default-card_base_bg': '#fff',
      '--default-card_base_fg': '#272a2e',
      '--transparent-text_primary': '#272a2e',
      '--transparent-text_secondary': '#6e7683',
      '--transparent-text_inactive': '#8690a0',
      '--transparent-bg_base': '#fff',
      '--transparent-bg_base_hover': '#f2f3f5',
      '--transparent-bg_base_active': '#e6e8ec',
      '--transparent-bg_accent': '#8690a0',
      '--transparent-bg_accent_hover': '#6e7683',
      '--transparent-bg_accent_active': '#565d67',
      '--transparent-bg_tint': '#f2f3f5',
      '--transparent-icon_default': '#8690a0',
      '--transparent-icon_inverted': '#fff',
      '--transparent-border_base': '#e6e8ec',
      '--transparent-border_base_hover': '#ced2d9',
      '--transparent-border_accent': '#8690a0',
      '--transparent-border_accent_inverted': '#fff',
      '--transparent-card_base_bg': '#f2f3f5',
      '--transparent-card_base_fg': '#272a2e',
      '--primary-text_primary': '#272a2e',
      '--primary-text_secondary': '#6e7683',
      '--primary-text_inactive': '#8690a0',
      '--primary-bg_base': '#fff',
      '--primary-bg_base_hover': '#f2f3f5',
      '--primary-bg_base_active': '#e6e8ec',
      '--primary-bg_accent': '#272a2e',
      '--primary-bg_accent_hover': '#1b1d20',
      '--primary-bg_accent_active': '#101112',
      '--primary-bg_tint': '#f2f3f5',
      '--primary-icon_default': '#8690a0',
      '--primary-icon_inverted': '#fff',
      '--primary-border_base': '#e6e8ec',
      '--primary-border_base_hover': '#ced2d9',
      '--primary-border_accent': '#6e7683',
      '--primary-border_accent_inverted': '#fff',
      '--primary-card_base_bg': '#f2f3f5',
      '--primary-card_base_fg': '#272a2e',
      '--positive-text_primary': '#133237',
      '--positive-text_secondary': '#1c97a8',
      '--positive-text_inactive': '#1fb8ce',
      '--positive-bg_base': '#fff',
      '--positive-bg_base_hover': '#f2f3f5',
      '--positive-bg_base_active': '#e3fafd',
      '--positive-bg_accent': '#22daf4',
      '--positive-bg_accent_hover': '#1fb8ce',
      '--positive-bg_accent_active': '#1c97a8',
      '--positive-bg_tint': '#e3fafd',
      '--positive-icon_default': '#1fb8ce',
      '--positive-icon_inverted': '#fff',
      '--positive-border_base': '#c7f5fc',
      '--positive-border_base_hover': '#90ecf9',
      '--positive-border_accent': '#22daf4',
      '--positive-border_accent_inverted': '#fff',
      '--positive-card_base_bg': '#e3fafd',
      '--positive-card_base_fg': '#133237',
      '--caution-text_primary': '#312c14',
      '--caution-text_secondary': '#967e1c',
      '--caution-text_inactive': '#b7991e',
      '--caution-bg_base': '#fff',
      '--caution-bg_base_hover': '#fef7da',
      '--caution-bg_base_active': '#fdefb6',
      '--caution-bg_accent': '#b7991e',
      '--caution-bg_accent_hover': '#967e1c',
      '--caution-bg_accent_active': '#746219',
      '--caution-bg_tint': '#fef7da',
      '--caution-icon_default': '#b7991e',
      '--caution-icon_inverted': '#fff',
      '--caution-border_base': '#fdefb6',
      '--caution-border_base_hover': '#fcdf6d',
      '--caution-border_accent': '#b7991e',
      '--caution-border_accent_inverted': '#fff',
      '--caution-card_base_bg': '#fef7da',
      '--caution-card_base_fg': '#312c14',
      '--critical-text_primary': '#3c1a17',
      '--critical-text_secondary': '#c33529',
      '--critical-text_inactive': '#f03e2f',
      '--critical-bg_base': '#fff',
      '--critical-bg_base_hover': '#fdebea',
      '--critical-bg_base_active': '#fcd8d5',
      '--critical-bg_accent': '#f03e2f',
      '--critical-bg_accent_hover': '#c33529',
      '--critical-bg_accent_active': '#962c23',
      '--critical-bg_tint': '#fdebea',
      '--critical-icon_default': '#f03e2f',
      '--critical-icon_inverted': '#fff',
      '--critical-border_base': '#fcd8d5',
      '--critical-border_base_hover': '#f9b1ab',
      '--critical-border_accent': '#f03e2f',
      '--critical-border_accent_inverted': '#fff',
      '--critical-card_base_bg': '#fdebea',
      '--critical-card_base_fg': '#3c1a17',
      '--spot-gray': '#8690a0',
      '--spot-blue': '#2276fc',
      '--spot-purple': '#c123fc',
      '--spot-magenta': '#e5389e',
      '--spot-red': '#f03e2f',
      '--spot-orange': '#e57322',
      '--spot-yellow': '#b7991e',
      '--spot-green': '#3ab564',
      '--spot-cyan': '#1fb8ce',
      '--syntax-atrule': '#9d1fcd',
      '--syntax-attrName': '#329454',
      '--syntax-attrValue': '#967e1c',
      '--syntax-attribute': '#967e1c',
      '--syntax-boolean': '#9d1fcd',
      '--syntax-builtin': '#9d1fcd',
      '--syntax-cdata': '#967e1c',
      '--syntax-char': '#967e1c',
      '--syntax-class': '#ba5f1f',
      '--syntax-className': '#1c97a8',
      '--syntax-comment': '#9ea6b3',
      '--syntax-constant': '#9d1fcd',
      '--syntax-deleted': '#c33529',
      '--syntax-doctype': '#9ea6b3',
      '--syntax-entity': '#c33529',
      '--syntax-function': '#329454',
      '--syntax-hexcode': '#1e61cd',
      '--syntax-id': '#9d1fcd',
      '--syntax-important': '#9d1fcd',
      '--syntax-inserted': '#967e1c',
      '--syntax-keyword': '#ba3082',
      '--syntax-number': '#9d1fcd',
      '--syntax-operator': '#ba3082',
      '--syntax-prolog': '#9ea6b3',
      '--syntax-property': '#1e61cd',
      '--syntax-pseudoClass': '#967e1c',
      '--syntax-pseudoElement': '#967e1c',
      '--syntax-punctuation': '#6e7683',
      '--syntax-regex': '#1e61cd',
      '--syntax-selector': '#c33529',
      '--syntax-string': '#967e1c',
      '--syntax-symbol': '#9d1fcd',
      '--syntax-tag': '#c33529',
      '--syntax-unit': '#ba5f1f',
      '--syntax-url': '#c33529',
      '--syntax-variable': '#c33529',
    }

    expect(result).toEqual(expected)
  })
  it('Should create the variables when a default tone is provided in light mode', () => {
    const defaultVariables = createCssVars('light', tones)
    const result = createCssVars('light', tones, 'caution')

    expect(result['--default-text_primary']).toEqual(result['--caution-text_primary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text_primary']).not.toEqual(defaultVariables['--caution-text_primary'])

    expect(result['--default-text_secondary']).toEqual(result['--caution-text_secondary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text_secondary']).not.toEqual(
      defaultVariables['--caution-text_secondary'],
    )
    // The base bg should not be mixed
    expect(result['--default-bg_base']).toEqual(defaultVariables['--caution-card_base_bg'])
  })
  it('Should create the variables when a default tone is provided in dark mdoe', () => {
    const defaultVariables = createCssVars('dark', tones)
    const result = createCssVars('dark', tones, 'caution')

    expect(result['--default-text_primary']).toEqual(result['--caution-text_primary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text_primary']).not.toEqual(defaultVariables['--caution-text_primary'])

    expect(result['--default-text_secondary']).toEqual(result['--caution-text_secondary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text_secondary']).not.toEqual(
      defaultVariables['--caution-text_secondary'],
    )
    // The base bg should not be mixed
    expect(result['--default-bg_base']).toEqual(defaultVariables['--caution-card_base_bg'])
  })
})