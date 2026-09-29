import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const TEXT_INPUT_MODS: AttributeMods = {
  __unstable_disableFocusRing: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The __unstable_disableFocusRing prop is no longer supported.',
  },
  border: {
    type: 'style-mapped',
    style: 'border',
    mapping: {
      false: 'none',
    },
  },
  clearButton: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The clearButton prop is no longer supported. Add a clear control yourself.',
  },
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.',
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
  icon: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The icon prop is no longer supported. Compose the icon yourself.',
  },
  iconRight: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The iconRight prop is no longer supported. Compose the icon yourself.',
  },
  onClear: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The onClear prop is no longer supported. Add a clear control yourself.',
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
  prefix: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The prefix prop is no longer supported. Compose the prefix yourself.',
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
  space: {type: 'remove'},
  suffix: {
    type: 'warn-only',
    warning:
      'Please double check the TextInput migration below. The suffix prop is no longer supported. Compose the suffix yourself.',
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
