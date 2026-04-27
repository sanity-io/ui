import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../../types/AttributeMods'
import type {BaseOptions} from '../../types/BaseOptions'
import {addAttribute} from '../../utils/addAttribute'
import {transformAttributes} from '../../utils/transformAttributes'
import {transformImport} from '../../utils/transformImport'

const MODS: AttributeMods = {
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
    type: 'mapped-only',
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

/** @internal */
export const TODO_WARNING = 'Codemod could not migrate the Text component below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Text', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Text'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
