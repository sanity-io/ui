import {useCommands} from '@sanity/base'
import {Card, useGlobalKeyDown} from '@sanity/ui'
import isHotkey from 'is-hotkey'
import React, {useState} from 'react'
import styled from 'styled-components'
import {CommandPaletteDialog} from './commandPaletteDialog'
import {Navbar} from './navbar'

interface LayoutProps {
  children?: React.ReactNode
  projectName: string
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Main = styled(Card).attrs({tone: 'transparent'})`
  flex: 1;
  min-height: 0;
`

const isCommmandPaletteKey = isHotkey('mod+p')

export function Layout(props: LayoutProps) {
  const {children, projectName} = props

  const [commmandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const commands = useCommands()

  useGlobalKeyDown((event) => {
    if (isCommmandPaletteKey(event)) {
      event.preventDefault()
      setCommandPaletteOpen(true)
    }

    for (const command of commands) {
      if (isHotkey(command.shortcut.join('+'))(event)) {
        event.preventDefault()
        command.handle()
        return
      }
    }
  })

  return (
    <Root>
      <Navbar projectName={projectName} />
      <Main>{children}</Main>
      {commmandPaletteOpen && <CommandPaletteDialog onClose={() => setCommandPaletteOpen(false)} />}
    </Root>
  )
}
