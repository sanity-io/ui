import {type API, type FileInfo} from 'jscodeshift'

import {addAttribute} from '../../utils/addAttribute'

/** @internal */
export const TODO_WARNING = 'Codemod could not migrate the Text component below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Heading'},
    })
    .forEach((path) => {
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
