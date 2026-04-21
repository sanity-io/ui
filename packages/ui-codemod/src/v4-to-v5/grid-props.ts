import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {transformAttributes} from '../utils/transformAttributes'
import {LAYOUT_MODS} from './constants/layout-attr-mods'

const MODS: AttributeMods = {
  ...LAYOUT_MODS,
  alignItems: {
    type: 'style-only',
    style: 'alignItems',
  },
  flexDirection: {
    type: 'style-only',
    style: 'flexDirection',
  },
  flexWrap: {
    type: 'style-only',
    style: 'flexWrap',
  },
  gridTemplateColumns: {
    type: 'mapped-only',
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
    type: 'mapped-only',
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
  justifyContent: {
    type: 'style-only',
    style: 'justifyContent',
  },
}

export const TODO_WARNING = 'Codemod could not migrate the Grid component below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Grid'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
