import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const TEXT_MODS: AttributeMods = {
  accent: {
    type: 'rename-mapped',
    name: 'tone',
    mapping: {
      true: 'suggest',
    },
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
    name: 'lineClamp',
    mapping: {
      ellipsis: 1,
      clip: 1,
    },
  },
}
