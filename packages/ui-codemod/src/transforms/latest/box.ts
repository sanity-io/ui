import {type API, type FileInfo} from 'jscodeshift'

import {LAYOUT_MODS} from '../../constants/latest/layout-mods'
import type {AttributeMods} from '../../types/AttributeMods'
import type {BaseOptions} from '../../types/BaseOptions'
import {transformAttributes} from '../../utils/transformAttributes'
import {transformImport} from '../../utils/transformImport'

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
  justifyContent: {
    type: 'style-only',
    style: 'justifyContent',
  },
}

/** @internal */
export const TODO_WARNING = 'Codemod could not migrate the Box component below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options?: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Box', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Box'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
