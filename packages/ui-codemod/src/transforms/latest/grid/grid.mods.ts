import {LAYOUT_MODS} from '../../../constants/latest/layout-mods'
import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const GRID_MODS: AttributeMods = {
  ...LAYOUT_MODS,
  alignItems: {
    type: 'style-only',
    style: 'alignItems',
  },
  autoCols: {
    type: 'rename-only',
    name: 'gridAutoColumns',
  },
  autoFlow: {
    type: 'rename-only',
    name: 'gridAutoFlow',
  },
  autoRows: {
    type: 'rename-only',
    name: 'gridAutoRows',
  },
  flexDirection: {
    type: 'style-only',
    style: 'flexDirection',
  },
  flexWrap: {
    type: 'style-only',
    style: 'flexWrap',
  },
  columns: {
    type: 'rename-mapped',
    name: 'gridTemplateColumns',
    mapping: {
      0: '0px',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
  },
  gridTemplateColumns: {
    type: 'mapped-only',
    mapping: {
      0: '0px',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
  },
  gridTemplateRows: {
    type: 'mapped-only',
    mapping: {
      0: '0px',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
  },
  justifyContent: {
    type: 'style-only',
    style: 'justifyContent',
  },
  rows: {
    type: 'rename-mapped',
    name: 'gridTemplateRows',
    mapping: {
      0: '0px',
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
  },
}
