import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const TEXT_AREA_MODS: AttributeMods = {
  __unstable_disableFocusRing: {
    type: 'warn-only',
    warning:
      'Please double check the TextArea migration below. The __unstable_disableFocusRing prop is no longer supported.',
  },
  border: {
    type: 'style-mapped',
    style: 'border',
    mapping: {
      false: 'none',
    },
  },
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the TextArea migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.',
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
  weight: {
    type: 'style-mapped',
    style: 'fontWeight',
    mapping: {
      regular: 'var(--regular)',
      medium: 'var(--medium)',
      semibold: 'var(--semibold)',
      bold: 'var(--bold)',
    },
  },
}
