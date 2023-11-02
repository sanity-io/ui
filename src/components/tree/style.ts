import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {
  _colorVarStyleActive,
  _colorVarStyleHover,
  _colorVarStyleSelected,
} from '../../styles/colorVars'
import {cssVars} from '../../theme'
import {cardVariables} from '../../theme/lib/theme/color/cssVariables/cardVariables'

export function treeItemRootStyle(): ReturnType<typeof css> {
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

export function treeItemRootColorStyle(): ReturnType<typeof css> {
  return css`
    /* <div role="none"><a data-ui="TreeItem__box" role="treeitem" tabIndex="0"></div> */
    &[role='none'] {
      & > [role='treeitem'] {
        ${cardVariables}

        background-color:${cssVars.mutable['bg-color']};
        color: var(--treeitem-fg-color);
      }

      &[data-selected] > [role='treeitem'] {
        ${_colorVarStyleActive()}
      }

      @media (hover: hover) {
        &:not([data-selected]) > [role='treeitem']:not(:focus):hover {
          ${_colorVarStyleHover()}
        }

        & > [role='treeitem']:focus {
          ${_colorVarStyleSelected()}
        }
      }
    }

    /* <div role="treeitem" tabIndex="0"><div data-ui="TreeItem__box"></div> */
    &[role='treeitem'] {
      & > [data-ui='TreeItem__box'] {
        ${cardVariables}
        background-color: ${cssVars.mutable['bg-color']};
        color: ${cssVars.mutable['fg-color']};
      }

      &[data-selected] > [data-ui='TreeItem__box'] {
        ${_colorVarStyleActive()}
      }

      @media (hover: hover) {
        &:not([data-selected]):not(:focus) > [data-ui='TreeItem__box']:hover {
          ${_colorVarStyleHover()}
        }

        &:focus > [data-ui='TreeItem__box'] {
          ${_colorVarStyleSelected()}
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
  const {$level, theme} = props
  const {space} = theme.sanity

  return css`
    padding-left: ${rem(space[2] * $level)};

    &[data-as='a'] {
      text-decoration: none;
    }
  `
}
