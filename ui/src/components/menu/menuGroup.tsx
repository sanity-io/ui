import {ChevronRightIcon} from '@sanity/icons'
import React, {useEffect, useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {Box, Popover, Text} from '../../primitives'
import {ThemeProps} from '../../styles'
import {useMenu} from './hooks'
import {Menu} from './menu'

const Root = styled.button((props: ThemeProps) => {
  const {theme} = props
  const tone = theme.sanity.color.card

  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    font: inherit;
    border: 0;
    border-radius: 0;
    background: none;
    color: inherit;
    text-align: left;
    margin: 0;
    padding: 0;
    outline: none;
    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    &:not(:disabled):focus {
      --card-bg-color: ${tone.selected.bg} !important;
      --card-fg-color: ${tone.selected.fg} !important;
    }

    &:not(:disabled):active {
      --card-bg-color: ${tone.pressed.bg};
      --card-fg-color: ${tone.pressed.fg};
    }

    &:disabled {
      --card-bg-color: ${tone.disabled.bg};
      --card-fg-color: ${tone.disabled.fg};
    }
  `
})

const TextContainer = styled.span`
  &&:not([hidden]) {
    display: flex;
  }

  & > div:first-child {
    flex: 1;
    min-width: 0;
  }
`

export function MenuGroup({children, title}: {children: React.ReactNode; title: string}) {
  const [open, setOpen] = useState(false)
  const {mount, onItemClick, onMouseEnter, onMouseLeave} = useMenu()
  const rootRef = useRef<HTMLButtonElement | null>(null)
  const mouseLeaveTimeoutRef = useRef<number | null>(null)

  useEffect(() => mount(rootRef.current), [mount])

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current)
    }

    onMouseEnter(event)
    setOpen(true)
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave(event)

    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 5000)
  }

  const handleMenuMouseEnter = () => {
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current)
    }
  }

  const handleMenuMouseLeave = () => {
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 5000)
  }

  useEffect(() => {
    return () => {
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current)
      }
    }
  }, [])

  const content = (
    <Menu onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
      {children}
    </Menu>
  )

  return (
    <Popover content={content} open={open} placement="right">
      <Root
        data-ui="MenuGroup"
        onClick={onItemClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={rootRef}
      >
        <Box padding={3}>
          <TextContainer>
            <Text>{title}</Text>
            <Text>
              <ChevronRightIcon />
            </Text>
          </TextContainer>
        </Box>
      </Root>
    </Popover>
  )
}
