import React, {cloneElement} from 'react'
import styled from 'styled-components'
import {rem} from '../../styles'
import {childrenToElementArray} from '../helpers'
import {AvatarCounter} from './avatarCounter'
import {avatarTheme} from './theme'
import {AvatarSize} from './types'

const Root = styled.div<{size: 0 | 1 | 2}>`
  white-space: nowrap;

  & > div {
    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  }

  & > div + div {
    margin-left: ${({size}) => rem(avatarTheme.distance[size])};
  }
`

interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize
  tone?: 'navbar'
}

export function AvatarStack(
  props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>
) {
  const {children: childrenProp, maxLength: maxLengthProp = 4, size = 0, tone, ...restProps} = props
  const maxLength = Math.max(maxLengthProp, 0)
  const children = childrenToElementArray(childrenProp).filter(
    (child) => typeof child !== 'string'
  ) as React.ReactElement[]
  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <>
      <Root data-ui="AvatarStack" {...restProps} size={size}>
        {len === 0 && (
          <div>
            <AvatarCounter count={len} tone={tone} />
          </div>
        )}

        {len !== 0 && extraCount > 1 && (
          <div>
            <AvatarCounter count={extraCount} size={size} tone={tone} />
          </div>
        )}

        {visibleChildren.map((child, childIndex) => (
          <div key={String(childIndex)}>{cloneElement(child, {size, tone})}</div>
        ))}
      </Root>
    </>
  )
}
