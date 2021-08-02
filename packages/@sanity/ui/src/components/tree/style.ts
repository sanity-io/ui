import {css, FlattenSimpleInterpolation} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'

export function treeItemRootStyle(): FlattenSimpleInterpolation {
  return css`
    &[role='none'] > [role='treeitem'] {
      outline: none;
      cursor: default;
      border-radius: 3px;

      &:focus {
        position: relative;
      }
    }

    &[role='treeitem'] {
      outline: none;

      & > div {
        cursor: default;
        border-radius: 3px;
      }

      &:focus > div {
        position: relative;
      }
    }
  `
}

export function treeItemRootColorStyle(props: ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const {base, card} = theme.sanity.color

  return css`
    ${_colorVarsStyle(base, card.enabled)}

    &[data-selected] {
      ${_colorVarsStyle(base, card.pressed)}
    }

    &[role='none'] > [role='treeitem'] {
      background-color: var(--card-bg-color);
      color: var(--treeitem-fg-color);

      &:not(:focus):hover {
        ${_colorVarsStyle(base, card.hovered)}
      }

      &:focus {
        ${_colorVarsStyle(base, card.selected)}
      }
    }

    &[role='treeitem'] {
      & > div {
        background-color: var(--card-bg-color);
        color: var(--card-fg-color);
      }

      &:not(:focus) > div:hover {
        ${_colorVarsStyle(base, card.hovered)}
      }

      &:focus > div {
        ${_colorVarsStyle(base, card.selected)}
      }
    }
  `
}

export interface TreeItemBoxStyleProps {
  $level: number
}

export function treeItemBoxStyle(
  props: TreeItemBoxStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$level, theme} = props
  const {space} = theme.sanity

  return css`
    padding-left: ${rem(space[2] * $level)};

    &[data-as='a'] {
      text-decoration: none;
    }
  `
}
