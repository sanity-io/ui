import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_cardColorStyle} from '../../styles/card/_cardColorStyle'
import {rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'

export function treeItemRootColorStyle(props: ThemeProps): ReturnType<typeof css> {
  const $tone = 'default'
  const {color} = getTheme_v2(props.theme)
  const tone = color.selectable[$tone]

  // An element's parent can't have both roles, so the state rules of both can share selector lists
  return css`
    &[role='none'] > [role='treeitem'],
    &[role='treeitem'] > [data-ui='TreeItem__box'] {
      ${_cardColorStyle(color, tone.enabled)}
    }

    &[role='none'][data-selected] > [role='treeitem'],
    &[role='treeitem'][data-selected] > [data-ui='TreeItem__box'] {
      ${_cardColorStyle(color, tone.pressed)}
    }

    @media (hover: hover) {
      &[role='none']:not([data-selected]) > [role='treeitem']:not(:focus):hover,
      &[role='treeitem']:not([data-selected]):not(:focus) > [data-ui='TreeItem__box']:hover {
        ${_cardColorStyle(color, tone.hovered)}
      }

      &[role='none'] > [role='treeitem']:focus,
      &[role='treeitem']:focus > [data-ui='TreeItem__box'] {
        ${_cardColorStyle(color, tone.selected)}
      }
    }
  `
}

export interface TreeItemBoxStyleProps {
  $level: number
}

export function treeItemBoxStyle(
  props: TreeItemBoxStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {$level} = props
  const {space} = getTheme_v2(props.theme)

  return css`
    display: block;
    padding-left: ${rem(space[2] * $level)};
    text-decoration: none;
  `
}
