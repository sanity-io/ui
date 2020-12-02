import {Card, Layer} from '@sanity/ui'
import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled(Layer)`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom: 1px solid var(--card-hairline-soft-color);
  }
`

export const Content = styled(Card)`
  flex: 1;
  min-height: 0;
`

export const ScrollContainer = styled.div`
  height: 100%;
  overflow: auto;
  outline: none;
`
