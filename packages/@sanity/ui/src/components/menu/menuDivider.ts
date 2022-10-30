import {memo} from 'react'
import styled from 'styled-components'

/**
 * @public
 */
export const MenuDivider = memo(styled.hr`
  height: 1px;
  border: 0;
  background: var(--card-hairline-soft-color);
  margin: 0;
`)
