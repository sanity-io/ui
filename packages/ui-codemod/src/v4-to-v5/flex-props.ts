import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {transformAttributes} from '../utils/transformAttributes'
import {LAYOUT_MODS} from './constants/layout-attr-mods'

const MODS: AttributeMods = {
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
    type: 'style-only',
    style: 'gridTemplateColumns',
  },
  gridTemplateRows: {
    type: 'style-only',
    style: 'gridTemplateRows',
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

export const TODO_WARNING = 'Codemod could not update the prop below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Flex'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
