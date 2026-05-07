import {LAYOUT_MODS} from '../../../constants/latest/layout-mods'
import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const FLEX_MODS: AttributeMods = {
  ...LAYOUT_MODS,
  align: {
    type: 'rename-only',
    name: 'alignItems',
  },
  direction: {
    type: 'rename-only',
    name: 'flexDirection',
  },
  gridAutoColumns: {
    type: 'style-only',
    style: 'gridAutoColumns',
  },
  gridAutoFlow: {
    type: 'style-only',
    style: 'gridAutoFlow',
  },
  gridAutoRows: {
    type: 'style-only',
    style: 'gridAutoRows',
  },
  gridTemplateColumns: {
    type: 'style-mapped',
    style: 'gridTemplateColumns',
    mapping: {
      0: '0px',
      1: 'repeat(1, 1fr)',
      2: 'repeat(2, 1fr)',
      3: 'repeat(3, 1fr)',
      4: 'repeat(4, 1fr)',
      5: 'repeat(5, 1fr)',
      6: 'repeat(6, 1fr)',
      7: 'repeat(7, 1fr)',
      8: 'repeat(8, 1fr)',
      9: 'repeat(9, 1fr)',
      10: 'repeat(10, 1fr)',
      11: 'repeat(11, 1fr)',
      12: 'repeat(12, 1fr)',
    },
  },
  gridTemplateRows: {
    type: 'style-mapped',
    style: 'gridTemplateRows',
    mapping: {
      0: '0px',
      1: 'repeat(1, 1fr)',
      2: 'repeat(2, 1fr)',
      3: 'repeat(3, 1fr)',
      4: 'repeat(4, 1fr)',
      5: 'repeat(5, 1fr)',
      6: 'repeat(6, 1fr)',
      7: 'repeat(7, 1fr)',
      8: 'repeat(8, 1fr)',
      9: 'repeat(9, 1fr)',
      10: 'repeat(10, 1fr)',
      11: 'repeat(11, 1fr)',
      12: 'repeat(12, 1fr)',
    },
  },
  wrap: {
    type: 'rename-only',
    name: 'flexWrap',
  },
  justify: {
    type: 'rename-only',
    name: 'justifyContent',
  },
}
