import styled from 'styled-components'
import {Card} from '../../atoms'

export const Root = styled.div`
  position: relative;
`

export const ListBoxContainer = styled.div`
  position: relative;
`

export const ListBoxCard = styled(Card)`
  position: absolute;
  top: 0;
  left: 1px;
  right: 1px;
  z-index: 1000;
  max-height: calc(100vh - 10em);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  min-height: 35px;

  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

export const LoadingCard = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  transition: opacity 100ms;

  &:not([hidden]) {
    display: flex;
  }
`
