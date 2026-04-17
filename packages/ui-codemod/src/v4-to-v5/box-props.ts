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
  justifyContent: {
    type: 'style-only',
    style: 'justifyContent',
  },
}

export const TODO_WARNING = 'Codemod could not update the prop below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Box'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
