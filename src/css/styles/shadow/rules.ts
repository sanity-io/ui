import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const shadowRules: Rules = {
  ...responsiveRules('shadow-0', {
    boxShadow: 'none',
  }),

  ...responsiveRules('shadow-1', {
    boxShadow: [
      `var(--shadow-outline) var(--color-shadow-outline)`,
      `var(--shadow-1-umbra) var(--color-shadow-umbra)`,
      `var(--shadow-1-penumbra) var(--color-shadow-penumbra)`,
      `var(--shadow-1-ambient) var(--color-shadow-ambient)`,
    ].join(', '),
  }),

  ...responsiveRules('shadow-2', {
    boxShadow: [
      `var(--shadow-outline) var(--color-shadow-outline)`,
      `var(--shadow-2-umbra) var(--color-shadow-umbra)`,
      `var(--shadow-2-penumbra) var(--color-shadow-penumbra)`,
      `var(--shadow-2-ambient) var(--color-shadow-ambient)`,
    ].join(', '),
  }),

  ...responsiveRules('shadow-3', {
    boxShadow: [
      `var(--shadow-outline) var(--color-shadow-outline)`,
      `var(--shadow-3-umbra) var(--color-shadow-umbra)`,
      `var(--shadow-3-penumbra) var(--color-shadow-penumbra)`,
      `var(--shadow-3-ambient) var(--color-shadow-ambient)`,
    ].join(', '),
  }),

  ...responsiveRules('shadow-4', {
    boxShadow: [
      `var(--shadow-outline) var(--color-shadow-outline)`,
      `var(--shadow-4-umbra) var(--color-shadow-umbra)`,
      `var(--shadow-4-penumbra) var(--color-shadow-penumbra)`,
      `var(--shadow-4-ambient) var(--color-shadow-ambient)`,
    ].join(', '),
  }),

  ...responsiveRules('shadow-5', {
    boxShadow: [
      `var(--shadow-outline) var(--color-shadow-outline)`,
      `var(--shadow-5-umbra) var(--color-shadow-umbra)`,
      `var(--shadow-5-penumbra) var(--color-shadow-penumbra)`,
      `var(--shadow-5-ambient) var(--color-shadow-ambient)`,
    ].join(', '),
  }),
}
