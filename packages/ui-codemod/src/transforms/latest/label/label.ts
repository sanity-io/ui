import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {replaceElement} from '../../../utils/replaceElement'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {LABEL_MODS} from './label.mods'

const TODO_WARNING = 'Please double check the Label migration below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Label', fromPackage, toPackage)

  replaceElement(
    j,
    root,
    () => true,
    {
      element: 'Label',
    },
    {
      element: 'Eyebrow',
      callback: (path) => {
        transformAttributes(j, path, LABEL_MODS, TODO_WARNING)
        addAttribute(j, path.node, 'as', 'div')
        addAttribute(j, path.node, 'trim', true)
      },
    },
    {replaceInStyled: true},
  )

  return root.toSource()
}
