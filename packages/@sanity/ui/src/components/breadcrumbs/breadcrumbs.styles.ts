import {memo} from 'react'
import styled from 'styled-components'
import {Button} from '../../primitives'

export const Root = memo(
  styled.ol({
    margin: 0,
    padding: 0,
    display: 'flex',
    listStyle: 'none',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    lineHeight: 0,
  })
)

export const ExpandButton = memo(
  styled(Button)({
    appearance: 'none',
    margin: '-4px',
  })
)
