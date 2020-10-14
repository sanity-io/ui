import {color} from '@sanity/color'
import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Icon, Popover, Text} from '../../atoms'
import {useMenu} from './hooks'
import {Menu} from './menu'

const Root = styled.button`
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

  &:not(:disabled):focus {
    background-color: ${color.blue[500].hex};
    color: ${color.white.hex};
  }

  &:not(:disabled):active {
    background-color: ${color.blue[600].hex};
    color: ${color.white.hex};
  }

  &:disabled {
    color: ${color.gray[200].hex};
  }
`

const TextContainer = styled.span`
  display: flex;

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
              <Icon symbol="chevron-right" />
            </Text>
          </TextContainer>
        </Box>
      </Root>
    </Popover>
  )
}
