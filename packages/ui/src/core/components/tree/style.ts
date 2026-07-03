import {getTheme_v2} from '@sanity/ui/theme'
import {css} from 'styled-components'

import {rem, ThemeProps} from '../../styles'
import {_cardColorStyle} from '../../styles/card'

export function treeItemRootStyle(): ReturnType<typeof css> {
  return css`
    &[role='none'] > [role='treeitem'] {
      outline: none;
      cursor: default;
      border-radius: 3px;

      background-color: var(--card-bg-color);
      color: var(--treeitem-fg-color);

      &:focus {
        position: relative;
      }
    }

    &[role='treeitem'] {
      outline: none;

      & > div {
        cursor: default;
        border-radius: 3px;

        background-color: var(--card-bg-color);
        color: var(--treeitem-fg-color);
      }

      &:focus > div {
        position: relative;
      }
    }
  `
}

export function treeItemRootColorStyle(props: ThemeProps): ReturnType<typeof css> {
  const $tone = 'default'
  const {color} = getTheme_v2(props.theme)
  const tone = color.selectable[$tone]

  return css`
    &[role='none'] {
      & > [role='treeitem'] {
        ${_cardColorStyle(color, tone.enabled)}
      }

      &[data-selected] > [role='treeitem'] {
        ${_cardColorStyle(color, tone.pressed)}
      }

      @media (hover: hover) {
        &:not([data-selected]) > [role='treeitem']:not(:focus):hover {
          ${_cardColorStyle(color, tone.hovered)}
        }

        & > [role='treeitem']:focus {
          ${_cardColorStyle(color, tone.selected)}
        }
      }
    }

    &[role='treeitem'] {
      & > [data-ui='TreeItem__box'] {
        ${_cardColorStyle(color, tone.enabled)}
      }

      &[data-selected] > [data-ui='TreeItem__box'] {
        ${_cardColorStyle(color, tone.pressed)}
      }

      @media (hover: hover) {
        &:not([data-selected]):not(:focus) > [data-ui='TreeItem__box']:hover {
          ${_cardColorStyle(color, tone.hovered)}
        }

        &:focus > [data-ui='TreeItem__box'] {
          ${_cardColorStyle(color, tone.selected)}
        }
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
    padding-left: ${rem(space[2] * $level)};

    &[data-as='a'] {
      text-decoration: none;
    }
  `
}
