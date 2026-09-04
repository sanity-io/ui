import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const BADGE_MODS: AttributeMods = {
  fontSize: {
    type: 'warn-only',
    warning:
      'Please double check the Badge migration below. The fontSize prop is no longer supported. Badge renders its text prop at size 1.',
  },
  mode: {type: 'remove'},
  paddingX: {
    type: 'style-mapped',
    style: 'paddingInline',
    mapping: {
      0: 'var(--space-0)',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
      9: 'var(--space-9)',
    },
  },
  paddingY: {
    type: 'style-mapped',
    style: 'paddingBlock',
    mapping: {
      0: 'var(--space-0)',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
      9: 'var(--space-9)',
    },
  },
  radius: {
    type: 'style-mapped',
    style: 'borderRadius',
    mapping: {
      0: 'var(--radius-0)',
      1: 'var(--radius-1)',
      2: 'var(--radius-2)',
      3: 'var(--radius-3)',
      4: 'var(--radius-4)',
      5: 'var(--radius-5)',
      6: 'var(--radius-6)',
      full: 'var(--radius-round)',
    },
  },
  tone: {
    type: 'mapped-only',
    mapping: {
      default: 'neutral',
      neutral: 'neutral',
      suggest: 'suggest',
      positive: 'positive',
      caution: 'caution',
      critical: 'critical',
    },
  },
}
