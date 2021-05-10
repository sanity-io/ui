import {Card, rem, Theme} from '@sanity/ui'
import styled, {css} from 'styled-components'

export const TreeCard = styled(Card)<{$level: number}>((props: {$level: number; theme: Theme}) => {
  const {$level, theme} = props
  const {space} = theme.sanity

  return css`
    padding-left: ${rem(space[2] * $level)};
  `
})
