import {vars} from '../../theme'
import type {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.text-input': {},

  '.text-input-prefix': {
    borderTop: `1px solid ${vars.color.border}`,
    borderLeft: `1px solid ${vars.color.border}`,
    borderBottom: `1px solid ${vars.color.border}`,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',

    nest: {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },

  '.text-input-element': {
    borderRadius: 'inherit',
  },

  '.text-input-suffix': {
    borderTop: `1px solid ${vars.color.border}`,
    borderRight: `1px solid ${vars.color.border}`,
    borderBottom: `1px solid ${vars.color.border}`,
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',

    nest: {
      '& > span': {
        display: 'block',
        margin: '-1px',
      },
    },
  },
}

export const textInputStyle: Style = {
  layers: {
    primitive,
  },
}
