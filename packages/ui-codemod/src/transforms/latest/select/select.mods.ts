import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const SELECT_MODS: AttributeMods = {
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.',
  },
  fontSize: {
    type: 'style-mapped',
    style: 'font',
    mapping: {
      0: 'var(--body-0)',
      1: 'var(--body-1)',
      2: 'var(--body-2)',
      3: 'var(--body-3)',
      4: 'var(--body-4)',
    },
  },
  gap: {
    type: 'remove',
  },
  padding: {
    type: 'style-mapped',
    style: 'padding',
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
  readOnly: {
    type: 'warn-only',
    warning:
      'Please double check the Select migration below. The readOnly prop is no longer valid, as the readonly HTML attribute is invalid on select elements.',
  },
  space: {type: 'remove'},
}
