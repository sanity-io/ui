import type {Properties, StyleRules} from './types'

/** @internal */
export function _responsiveRule(rules: StyleRules, _name: string, properties: Properties): void {
  const name = _name.replace(/\./g, '_')

  rules[`.${name}`] = properties
  rules[`.1\\:${name}`] = {
    '@media': {
      'screen and (min-width: 360px)': properties,
    },
  }
  rules[`.2\\:${name}`] = {
    '@media': {
      'screen and (min-width: 600px)': properties,
    },
  }
  rules[`.3\\:${name}`] = {
    '@media': {
      'screen and (min-width: 900px)': properties,
    },
  }
  rules[`.4\\:${name}`] = {
    '@media': {
      'screen and (min-width: 1200px)': properties,
    },
  }
  rules[`.5\\:${name}`] = {
    '@media': {
      'screen and (min-width: 1800px)': properties,
    },
  }
  rules[`.6\\:${name}`] = {
    '@media': {
      'screen and (min-width: 2400px)': properties,
    },
  }
}
