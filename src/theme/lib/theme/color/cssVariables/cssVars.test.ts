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
      '--default-text-primary': '#1f2228',
      '--default-text-secondary': '#5e6573',
      '--default-text-inactive': '#788191',
      '--default-text-code': '#5e6573',
      '--default-text-muted': '#5e6573',
      '--default-text-link': '#0661fe',
      '--default-text-accent': '#ec4636',
      '--default-bg-base': '#ffffff',
      '--default-bg-base-hover': '#f9f9fa',
      '--default-bg-base-active': '#f3f4f6',
      '--default-bg-accent': '#1f2228',
      '--default-bg-accent-hover': '#17191c',
      '--default-bg-accent-active': '#111213',
      '--default-bg-tint': '#f9f9fa',
      '--default-bg-tint-code': '#f9f9fa',
      '--default-icon-default': '#788191',
      '--default-icon-inverted': '#ffffff',
      '--default-border-base': '#f3f4f6',
      '--default-border-base-hover': '#e2e6e9',
      '--default-border-accent': '#5e6573',
      '--default-border-accent-inverted': '#ffffff',
      '--default-base-bg-card': '#ffffff',
      '--default-base-bg-raw': '#ffffff',
      '--default-base-shadow-outline-color': 'rgba(120,129,145,0.4)',
      '--default-base-shadow-umbra-color': 'rgba(120,129,145,0.2)',
      '--default-base-shadow-penumbra-color': 'rgba(120,129,145,0.14)',
      '--default-base-shadow-ambient-color': 'rgba(120,129,145,0.12)',
      '--default-base-text-color': '#ffffff',
      '--default-skeleton-from': '#f3f4f6',
      '--default-skeleton-to': 'rgba(249,249,250,0.5)',
      '--transparent-text-primary': '#1f2228',
      '--transparent-text-secondary': '#5e6573',
      '--transparent-text-inactive': '#788191',
      '--transparent-text-code': '#5e6573',
      '--transparent-text-muted': '#5e6573',
      '--transparent-text-link': '#0661fe',
      '--transparent-text-accent': '#ec4636',
      '--transparent-bg-base': '#ffffff',
      '--transparent-bg-base-hover': '#f9f9fa',
      '--transparent-bg-base-active': '#f3f4f6',
      '--transparent-bg-accent': '#788191',
      '--transparent-bg-accent-hover': '#5e6573',
      '--transparent-bg-accent-active': '#464c58',
      '--transparent-bg-tint': '#f9f9fa',
      '--transparent-bg-tint-code': '#f9f9fa',
      '--transparent-icon-default': '#788191',
      '--transparent-icon-inverted': '#ffffff',
      '--transparent-border-base': '#f3f4f6',
      '--transparent-border-base-hover': '#e2e6e9',
      '--transparent-border-accent': '#788191',
      '--transparent-border-accent-inverted': '#ffffff',
      '--transparent-base-bg-card': '#f9f9fa',
      '--transparent-base-bg-raw': '#ffffff',
      '--transparent-base-shadow-outline-color': 'rgba(120,129,145,0.4)',
      '--transparent-base-shadow-umbra-color': 'rgba(120,129,145,0.2)',
      '--transparent-base-shadow-penumbra-color': 'rgba(120,129,145,0.14)',
      '--transparent-base-shadow-ambient-color': 'rgba(120,129,145,0.12)',
      '--transparent-base-text-color': '#ffffff',
      '--transparent-skeleton-from': '#f3f4f6',
      '--transparent-skeleton-to': 'rgba(249,249,250,0.5)',
      '--primary-text-primary': '#1f2228',
      '--primary-text-secondary': '#5e6573',
      '--primary-text-inactive': '#788191',
      '--primary-text-code': '#5e6573',
      '--primary-text-muted': '#5e6573',
      '--primary-text-link': '#0661fe',
      '--primary-text-accent': '#ec4636',
      '--primary-bg-base': '#ffffff',
      '--primary-bg-base-hover': '#f9f9fa',
      '--primary-bg-base-active': '#f3f4f6',
      '--primary-bg-accent': '#1f2228',
      '--primary-bg-accent-hover': '#17191c',
      '--primary-bg-accent-active': '#111213',
      '--primary-bg-tint': '#f9f9fa',
      '--primary-bg-tint-code': '#f9f9fa',
      '--primary-icon-default': '#788191',
      '--primary-icon-inverted': '#ffffff',
      '--primary-border-base': '#f3f4f6',
      '--primary-border-base-hover': '#e2e6e9',
      '--primary-border-accent': '#5e6573',
      '--primary-border-accent-inverted': '#ffffff',
      '--primary-base-bg-card': '#f9f9fa',
      '--primary-base-bg-raw': '#ffffff',
      '--primary-base-shadow-outline-color': 'rgba(120,129,145,0.4)',
      '--primary-base-shadow-umbra-color': 'rgba(120,129,145,0.2)',
      '--primary-base-shadow-penumbra-color': 'rgba(120,129,145,0.14)',
      '--primary-base-shadow-ambient-color': 'rgba(120,129,145,0.12)',
      '--primary-base-text-color': '#ffffff',
      '--primary-skeleton-from': '#f3f4f6',
      '--primary-skeleton-to': 'rgba(249,249,250,0.5)',
      '--positive-text-primary': '#0b2a32',
      '--positive-text-secondary': '#0e9ebe',
      '--positive-text-inactive': '#0ecff1',
      '--positive-text-code': '#0e9ebe',
      '--positive-text-muted': '#0e9ebe',
      '--positive-text-link': '#0661fe',
      '--positive-text-accent': '#ec4636',
      '--positive-bg-base': '#ffffff',
      '--positive-bg-base-hover': '#f9f9fa',
      '--positive-bg-base-active': '#ebfdff',
      '--positive-bg-accent': '#41e1f6',
      '--positive-bg-accent-hover': '#0ecff1',
      '--positive-bg-accent-active': '#0e9ebe',
      '--positive-bg-tint': '#ebfdff',
      '--positive-bg-tint-code': '#ebfdff',
      '--positive-icon-default': '#0ecff1',
      '--positive-icon-inverted': '#ffffff',
      '--positive-border-base': '#d2fcfe',
      '--positive-border-base-hover': '#aaf8fd',
      '--positive-border-accent': '#41e1f6',
      '--positive-border-accent-inverted': '#ffffff',
      '--positive-base-bg-card': '#ebfdff',
      '--positive-base-bg-raw': '#ffffff',
      '--positive-base-shadow-outline-color': 'rgba(14,207,241,0.4)',
      '--positive-base-shadow-umbra-color': 'rgba(14,207,241,0.2)',
      '--positive-base-shadow-penumbra-color': 'rgba(14,207,241,0.14)',
      '--positive-base-shadow-ambient-color': 'rgba(14,207,241,0.12)',
      '--positive-base-text-color': '#ffffff',
      '--positive-skeleton-from': '#d2fcfe',
      '--positive-skeleton-to': 'rgba(235,253,255,0.5)',
      '--caution-text-primary': '#331f0a',
      '--caution-text-secondary': '#cb920b',
      '--caution-text-inactive': '#f3bc16',
      '--caution-text-code': '#cb920b',
      '--caution-text-muted': '#cb920b',
      '--caution-text-link': '#0661fe',
      '--caution-text-accent': '#ec4636',
      '--caution-bg-base': '#ffffff',
      '--caution-bg-base-hover': '#fffdf0',
      '--caution-bg-base-active': '#fef7cd',
      '--caution-bg-accent': '#f3bc16',
      '--caution-bg-accent-hover': '#cb920b',
      '--caution-bg-accent-active': '#98670b',
      '--caution-bg-tint': '#fffdf0',
      '--caution-bg-tint-code': '#fffdf0',
      '--caution-icon-default': '#f3bc16',
      '--caution-icon-inverted': '#ffffff',
      '--caution-border-base': '#fef7cd',
      '--caution-border-base-hover': '#fbf1a7',
      '--caution-border-accent': '#f3bc16',
      '--caution-border-accent-inverted': '#ffffff',
      '--caution-base-bg-card': '#fffdf0',
      '--caution-base-bg-raw': '#ffffff',
      '--caution-base-shadow-outline-color': 'rgba(243,188,22,0.4)',
      '--caution-base-shadow-umbra-color': 'rgba(243,188,22,0.2)',
      '--caution-base-shadow-penumbra-color': 'rgba(243,188,22,0.14)',
      '--caution-base-shadow-ambient-color': 'rgba(243,188,22,0.12)',
      '--caution-base-text-color': '#ffffff',
      '--caution-skeleton-from': '#fef7cd',
      '--caution-skeleton-to': 'rgba(255,253,240,0.5)',
      '--critical-text-primary': '#421410',
      '--critical-text-secondary': '#d72414',
      '--critical-text-inactive': '#f6a098',
      '--critical-text-code': '#d72414',
      '--critical-text-muted': '#d72414',
      '--critical-text-link': '#0661fe',
      '--critical-text-accent': '#ec4636',
      '--critical-bg-base': '#ffffff',
      '--critical-bg-base-hover': '#fff5f5',
      '--critical-bg-base-active': '#fee8e7',
      '--critical-bg-accent': '#ec4636',
      '--critical-bg-accent-hover': '#d72414',
      '--critical-bg-accent-active': '#a52112',
      '--critical-bg-tint': '#fff5f5',
      '--critical-bg-tint-code': '#fff5f5',
      '--critical-icon-default': '#ec4636',
      '--critical-icon-inverted': '#ffffff',
      '--critical-border-base': '#fee8e7',
      '--critical-border-base-hover': '#fbccc6',
      '--critical-border-accent': '#ec4636',
      '--critical-border-accent-inverted': '#ffffff',
      '--critical-base-bg-card': '#fff5f5',
      '--critical-base-bg-raw': '#ffffff',
      '--critical-base-shadow-outline-color': 'rgba(236,70,54,0.4)',
      '--critical-base-shadow-umbra-color': 'rgba(236,70,54,0.2)',
      '--critical-base-shadow-penumbra-color': 'rgba(236,70,54,0.14)',
      '--critical-base-shadow-ambient-color': 'rgba(236,70,54,0.12)',
      '--critical-base-text-color': '#ffffff',
      '--critical-skeleton-from': '#fee8e7',
      '--critical-skeleton-to': 'rgba(255,245,245,0.5)',
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
      '--card-code-bg-color': 'var(--default-bg-tint-code)',
      '--card-code-fg-color': 'var(--default-text-code)',
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
    expect(result['--default-bg_base']).toEqual(defaultVariables['--caution-card_base_bg'])

    expect(result['--default-base-shadow-ambient-color']).toEqual(
      defaultVariables['--caution-base-shadow-ambient-color'],
    )
    expect(result['--default-base-shadow-ambient-color']).not.toEqual(
      defaultVariables['--positive-base-shadow-ambient-color'],
    )
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
    expect(result['--default-bg_base']).toEqual(defaultVariables['--caution-card_base_bg'])
  })
})
