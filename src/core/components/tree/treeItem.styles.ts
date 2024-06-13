import {memo} from 'react'
import {styled} from 'styled-components'
import {Box, Text} from '../../primitives'
import {
  treeItemRootStyle,
  treeItemRootColorStyle,
  treeItemBoxStyle,
  TreeItemBoxStyleProps,
} from './style'

export const Root = memo(styled.li(treeItemRootStyle, treeItemRootColorStyle))

export const TreeItemBox = styled(Box).attrs({forwardedAs: 'a'})<TreeItemBoxStyleProps>(
  treeItemBoxStyle,
)

export const ToggleArrowText = styled(Text)`
  & > svg {
    transition: transform 100ms;
  }
`
