import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const HEADING_MODS: AttributeMods = {
  as: {
    type: 'warn-missing',
    warning:
      'Please double check the Heading migration below. The as prop is missing and will default to h2.',
  },
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
  maxWidth: {
    type: 'style-mapped',
    style: 'maxWidth',
    mapping: {
      auto: 'none',
      fill: '100%',
      0: '20rem',
      1: '40rem',
      2: '60rem',
      3: '80rem',
      4: '100rem',
      5: '120rem',
    },
  },
  textOverflow: {
    type: 'rename-mapped',
    name: 'truncate',
    mapping: {
      ellipsis: 1,
      clip: 1,
    },
  },
  width: {
    type: 'style-mapped',
    style: 'width',
    mapping: {
      auto: 'auto',
      fill: '100%',
      stretch: 'stretch',
      min: 'min-content',
      max: 'max-content',
      0: '20rem',
      1: '40rem',
      2: '60rem',
      3: '80rem',
      4: '100rem',
      5: '120rem',
    },
  },
}
