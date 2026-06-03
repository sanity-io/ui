import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const INLINE_MODS: AttributeMods = {
  flex: {
    type: 'style-mapped',
    style: 'flex',
    mapping: {
      none: '0 0 auto',
      auto: '1 1 auto',
      initial: '0 1 auto',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },
  },
  margin: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginX: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginY: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginTop: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginRight: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginBottom: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  marginLeft: {
    type: 'warn-only',
    warning:
      'Please double check the Inline migration below. Margin is not supported in either version.',
  },
  space: {
    type: 'rename-only',
    name: 'gap',
  },
}
