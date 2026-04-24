import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../../types/AnyExpression'
import type {BaseOptions} from '../../types/BaseOptions'
import {transformAttributes} from '../../utils/transformAttributes'
import {transformImport} from '../../utils/transformImport'

const MODS: AttributeMods = {
  column: {
    type: 'rename-mapped',
    name: 'gridColumn',
    mapping: {
      auto: 'auto',
      full: '1 / -1',
      1: 'span 1 / span 1',
      2: 'span 2 / span 2',
      3: 'span 3 / span 3',
      4: 'span 4 / span 4',
      5: 'span 5 / span 5',
      6: 'span 6 / span 6',
      7: 'span 7 / span 7',
      8: 'span 8 / span 8',
      9: 'span 9 / span 9',
      10: 'span 10 / span 10',
      11: 'span 11 / span 11',
      12: 'span 12 / span 12',
    },
  },
  columnEnd: {
    type: 'rename-mapped',
    name: 'gridColumnEnd',
    mapping: {
      auto: 'auto',
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
  columnStart: {
    type: 'rename-mapped',
    name: 'gridColumnStart',
    mapping: {
      auto: 'auto',
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
  flex: {
    type: 'style-only',
    style: 'flex',
  },
  height: {
    type: 'mapped-only',
    mapping: {
      fill: '100%',
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      stretch: 'stretch',
    },
  },
  row: {
    type: 'rename-mapped',
    name: 'gridRow',
    mapping: {
      auto: 'auto',
      full: '1 / -1',
      1: 'span 1 / span 1',
      2: 'span 2 / span 2',
      3: 'span 3 / span 3',
      4: 'span 4 / span 4',
      5: 'span 5 / span 5',
      6: 'span 6 / span 6',
      7: 'span 7 / span 7',
      8: 'span 8 / span 8',
      9: 'span 9 / span 9',
      10: 'span 10 / span 10',
      11: 'span 11 / span 11',
      12: 'span 12 / span 12',
    },
  },
  rowEnd: {
    type: 'rename-mapped',
    name: 'gridRowEnd',
    mapping: {
      auto: 'auto',
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
  rowStart: {
    type: 'rename-mapped',
    name: 'gridRowStart',
    mapping: {
      auto: 'auto',
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
  sizing: {
    type: 'style-mapped',
    style: 'boxSizing',
    mapping: {
      content: 'content-box',
      border: 'border-box',
    },
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
