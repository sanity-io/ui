import {Card, Layer, rem, Theme} from '@sanity/ui'
import React, {forwardRef} from 'react'
import styled, {css} from 'styled-components'

const Root = styled(Layer)<{open: boolean}>(({open, theme}: {open: boolean; theme: Theme}) => {
  return css`
    @media (max-width: ${rem(theme.sanity.media[1] - 1)}) {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      transform: translate3d(calc(-100% - 1px), 0, 0);
      transition: transform 200ms;
      width: 12rem;
      box-shadow: 0 0 0 1px var(--card-shadow-outline-color);

      ${open &&
      css`
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 0 1px var(--card-shadow-outline-color),
          0 0 0 9999px var(--card-shadow-umbra-color);
      `}
    }

    @media (min-width: ${rem(theme.sanity.media[1])}) {
      border-right: 1px solid var(--card-hairline-soft-color);
      position: sticky;
      top: 0;
    }
  `
})

export const NavDrawer = forwardRef(
  (
    {children, open}: {children: React.ReactNode; open: boolean},
    ref: React.Ref<HTMLDivElement>
  ) => (
    <Root zOffset={1000} open={open} ref={ref}>
      <Card height="fill">{children}</Card>
    </Root>
  )
)

NavDrawer.displayName = 'NavDrawer'
