import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getAttribute} from '../../../utils/getAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStaticAttributeExpression} from '../../../utils/getStaticAttributeExpression'
import {replaceElement} from '../../../utils/replaceElement'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {BOX_MODS} from '../box/box.mods'
import {CARD_MODS} from './card.mods'

const CARD_TODO_WARNING = 'Please double check the Card migration below'
const BOX_TODO_WARNING = 'Please double check the Box migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Card', options)

    if (!shouldTransformComponent(j, root, 'Card', localNames, options)) {
      return
    }

    if (transformImport(j, root, 'Card', fromPackage, toPackage)) {
      markChanged()
    }

    if (
      replaceElement(
        j,
        root,
        (attrs) => {
          const density = getAttribute(attrs, 'density')
          const muted = getAttribute(attrs, 'muted')
          const scheme = getAttribute(attrs, 'scheme')
          const border = getAttribute(attrs, 'border')
          const padding = getStaticAttributeExpression(j, attrs, 'padding')
          const radius = getStaticAttributeExpression(j, attrs, 'radius')

          return !(
            density ||
            muted ||
            scheme ||
            (border && padding === 3 && radius == 2) ||
            (border && padding === 4 && radius == 3) ||
            (border && padding === 5 && radius == 4)
          )
        },
        {
          element: 'Card',
          callback: (path) => transformAttributes(j, path, CARD_MODS, CARD_TODO_WARNING),
        },
        {
          element: 'Box',
          callback: (path) => transformAttributes(j, path, BOX_MODS, BOX_TODO_WARNING),
        },
      )
    ) {
      markChanged()
    }
  })
}
