import {ColorTints, hues} from '@sanity/color'
import {ThemeColorName} from '../types'
import {createCssVars, cssVars} from './createCssVars'

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
      '--default-base-bg-card': '#ffffff',
      '--default-base-shadow-outline-color': 'rgba(118,127,143,0.4)',
      '--default-base-shadow-umbra-color': 'rgba(118,127,143,0.2)',
      '--default-base-shadow-penumbra-color': 'rgba(118,127,143,0.14)',
      '--default-base-shadow-ambient-color': 'rgba(118,127,143,0.12)',
      '--default-base-text-color': '#ffffff',
      '--default-skeleton-from': '#e4e7ec',
      '--default-skeleton-to': 'rgba(243,244,247,0.5)',
      '--default-text-link': '#166bfe',
      '--default-text-accent': '#e22e1d',
      '--default-icon-default': '#767f8f',
      '--default-icon-inverted': '#ffffff',
      '--default-bg-base': '#ffffff',
      '--default-text-primary': '#25282d',
      '--default-text-secondary': '#5e6673',
      '--default-text-inactive': '#767f8f',
      '--default-bg-base-hover': '#f3f4f7',
      '--default-bg-base-active': '#e4e7ec',
      '--default-bg-accent': '#25282d',
      '--default-bg-accent-hover': '#1c1e22',
      '--default-bg-accent-active': '#111213',
      '--default-bg-tint': '#f3f4f7',
      '--default-border-base': '#e4e7ec',
      '--default-border-base-hover': '#c4cad4',
      '--default-border-accent': '#5e6673',
      '--default-border-accent-inverted': '#ffffff',
      '--transparent-text-primary': '#25282d',
      '--transparent-text-secondary': '#5e6673',
      '--transparent-text-inactive': '#767f8f',
      '--transparent-bg-base-hover': '#f3f4f7',
      '--transparent-bg-base-active': '#e4e7ec',
      '--transparent-bg-accent': '#767f8f',
      '--transparent-bg-accent-hover': '#5e6673',
      '--transparent-bg-accent-active': '#49505a',
      '--transparent-bg-tint': '#f3f4f7',
      '--transparent-border-base': '#e4e7ec',
      '--transparent-border-base-hover': '#c4cad4',
      '--transparent-border-accent': '#767f8f',
      '--transparent-border-accent-inverted': '#ffffff',
      '--primary-text-primary': '#25282d',
      '--primary-text-secondary': '#5e6673',
      '--primary-text-inactive': '#767f8f',
      '--primary-bg-base-hover': '#f3f4f7',
      '--primary-bg-base-active': '#e4e7ec',
      '--primary-bg-accent': '#25282d',
      '--primary-bg-accent-hover': '#1c1e22',
      '--primary-bg-accent-active': '#111213',
      '--primary-bg-tint': '#f3f4f7',
      '--primary-border-base': '#e4e7ec',
      '--primary-border-base-hover': '#c4cad4',
      '--primary-border-accent': '#5e6673',
      '--primary-border-accent-inverted': '#ffffff',
      '--positive-text-primary': '#0f2f2a',
      '--positive-text-secondary': '#099079',
      '--positive-text-inactive': '#15ac93',
      '--positive-bg-base-hover': '#f3f4f7',
      '--positive-bg-base-active': '#dcfef8',
      '--positive-bg-accent': '#1ed2b4',
      '--positive-bg-accent-hover': '#15ac93',
      '--positive-bg-accent-active': '#099079',
      '--positive-bg-tint': '#dcfef8',
      '--positive-border-base': '#bafcf1',
      '--positive-border-base-hover': '#72f8e1',
      '--positive-border-accent': '#1ed2b4',
      '--positive-border-accent-inverted': '#ffffff',
      '--caution-text-primary': '#332514',
      '--caution-text-secondary': '#9f760f',
      '--caution-text-inactive': '#c69910',
      '--caution-bg-base-hover': '#fefbe7',
      '--caution-bg-base-active': '#faf3b2',
      '--caution-bg-accent': '#c69910',
      '--caution-bg-accent-hover': '#9f760f',
      '--caution-bg-accent-active': '#785612',
      '--caution-bg-tint': '#fefbe7',
      '--caution-border-base': '#faf3b2',
      '--caution-border-base-hover': '#f5e18a',
      '--caution-border-accent': '#c69910',
      '--caution-border-accent-inverted': '#ffffff',
      '--critical-text-primary': '#3d1815',
      '--critical-text-secondary': '#b5291c',
      '--critical-text-inactive': '#f38177',
      '--critical-bg-base-hover': '#fde9e8',
      '--critical-bg-base-active': '#fcd7d4',
      '--critical-bg-accent': '#e22e1d',
      '--critical-bg-accent-hover': '#b5291c',
      '--critical-bg-accent-active': '#8e241a',
      '--critical-bg-tint': '#fde9e8',
      '--critical-border-base': '#fcd7d4',
      '--critical-border-base-hover': '#f8b1aa',
      '--critical-border-accent': '#e22e1d',
      '--critical-border-accent-inverted': '#ffffff',
      '--card-shadow-outline-color': 'var(--default-base-shadow-outline-color)',
      '--card-shadow-umbra-color': 'var(--default-base-shadow-umbra-color)',
      '--card-shadow-penumbra-color': 'var(--default-base-shadow-penumbra-color)',
      '--card-shadow-ambient-color': 'var(--default-base-shadow-ambient-color)',
      '--card-focus-ring-color': 'var(--positive-bg-accent)',
      '--card-icon-color': 'var(--default-icon-default)',
      '--card-bg-image': 'inherit',
      '--card-bg-color': 'var(--default-bg-base)',
      '--card-fg-color': 'var(--default-text-primary)',
      '--card-muted-fg-color': 'var(--default-text-secondary)',
      '--card-accent-fg-color': 'var(--default-text-accent)',
      '--card-link-fg-color': 'var(--default-text-link)',
      '--card-code-bg-color': 'var(--default-bg-tint)',
      '--card-code-fg-color': 'var(--default-text-secondary)',
      '--card-skeleton-color-from': 'var(--default-skeleton-from)',
      '--card-skeleton-color-to': 'var(--default-skeleton-to)',
      '--card-link-color': 'var(--default-text-link)',
      '--card-hairline-soft-color': 'var(--default-border-base)',
      '--card-hairline-hard-color': 'var(--default-border-base)',
      '--card-bg2-color': 'var(--default-bg-tint)',
    }

    expect(result).toEqual(expected)
  })
  it('Should create the variables when a default tone is provided in light mode', () => {
    const defaultVariables = createCssVars('light', tones)
    const result = createCssVars('light', tones, 'caution')

    expect(result['--default-text-primary']).toEqual(result['--caution-text-primary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text-primary']).not.toEqual(defaultVariables['--caution-text-primary'])

    expect(result['--default-text-secondary']).toEqual(result['--caution-text-secondary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text-secondary']).not.toEqual(
      defaultVariables['--caution-text-secondary'],
    )
    // The default base bg should not be mixed
    expect(result['--default-bg-base']).toEqual('var(--default-base-bg-card)')
  })
  it('Should create the variables when a default tone is provided in dark mode', () => {
    const defaultVariables = createCssVars('dark', tones)
    const result = createCssVars('dark', tones, 'caution')

    expect(result['--default-text-primary']).toEqual(result['--caution-text-primary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text-primary']).not.toEqual(defaultVariables['--caution-text-primary'])

    expect(result['--default-text-secondary']).toEqual(result['--caution-text-secondary'])
    // It's not equal because it has been mixed with the default bg
    expect(result['--default-text-secondary']).not.toEqual(
      defaultVariables['--caution-text-secondary'],
    )
    // The base bg should not be mixed
    expect(result['--default-bg-base']).toEqual('var(--default-base-bg-card)')
  })
  it('Should have a value for all the available variables', () => {
    const result = createCssVars('light', tones)

    function extractVar(cssVar: string) {
      const regex = /var\(([^)]+)\)/
      const match = cssVar.match(regex)

      if (match && match[1]) {
        return match[1].trim()
      }

      return cssVar
    }

    Object.keys(cssVars).forEach((_firstLevel) => {
      const firstLevel = _firstLevel as keyof typeof cssVars

      Object.keys(cssVars[firstLevel]).forEach((_key) => {
        const key = _key as keyof (typeof cssVars)[typeof firstLevel]
        const cssVar = cssVars[firstLevel][key] as string

        expect(result[extractVar(cssVar)]).toBeDefined()
      })
    })
  })
})
