import {Box, Card, Dialog, Flex, Hotkeys, Selectable, Stack, Text, TextInput} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {useCommandController} from '../lib/commands'
import type {ActiveBinding} from '../lib/commands/types'

/** @internal */
export interface CommandPaletteProps {
  onClose: () => void
  open: boolean
}

/** @internal */
export function CommandPalette(props: CommandPaletteProps) {
  const {onClose, open} = props
  const commandController = useCommandController()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [commands, setCommands] = useState<ActiveBinding[]>([])

  // Subscribe to command updates
  useEffect(() => {
    if (!open) return undefined

    const updateCommands = () => {
      setCommands(commandController.getActiveBindings())
    }

    updateCommands()
    return commandController.subscribe(updateCommands)
  }, [commandController, open])

  // Filter commands based on search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commands

    const query = searchQuery.toLowerCase()
    return commands.filter((cmd) => {
      const idMatch = cmd.id.toLowerCase().includes(query)
      const keysMatch = cmd.display.toLowerCase().includes(query)
      return idMatch || keysMatch
    })
  }, [commands, searchQuery])

  // Compute safe selected index that's always in bounds
  const safeSelectedIndex = useMemo(() => {
    if (filteredCommands.length === 0) return 0
    return Math.min(selectedIndex, filteredCommands.length - 1)
  }, [filteredCommands.length, selectedIndex])

  // Reset state when dialog opens
  const prevOpenRef = useRef(open)
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      // Intentionally resetting state when dialog opens
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery('')
      setSelectedIndex(0)
    }
    prevOpenRef.current = open
  }, [open])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (event.key === 'Enter' && filteredCommands[safeSelectedIndex]) {
        event.preventDefault()
        const cmd = filteredCommands[safeSelectedIndex]
        commandController.run(cmd.id, {source: 'palette'})
        onClose()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    },
    [commandController, filteredCommands, onClose, safeSelectedIndex],
  )

  const handleCommandClick = useCallback(
    (cmd: ActiveBinding) => {
      commandController.run(cmd.id, {source: 'palette'})
      onClose()
    },
    [commandController, onClose],
  )

  if (!open) return null

  return (
    <Dialog
      header="Command Palette"
      id="command-palette"
      width={1}
      onClickOutside={onClose}
      onClose={onClose}
    >
      <Box padding={3}>
        <Stack gap={3}>
          <TextInput
            fontSize={2}
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />

          <Card border padding={2} radius={2} shadow={1}>
            <Stack gap={1}>
              {filteredCommands.length === 0 ? (
                <Box padding={3}>
                  <Text align="center" muted size={1}>
                    {searchQuery ? 'No commands found' : 'No commands available'}
                  </Text>
                </Box>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <Selectable
                    key={cmd.id}
                    as="button"
                    padding={3}
                    radius={2}
                    selected={index === safeSelectedIndex}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onClick={() => handleCommandClick(cmd)}
                  >
                    <Flex align="center" justify="space-between">
                      <Text size={1} weight={index === safeSelectedIndex ? 'semibold' : 'regular'}>
                        {cmd.id}
                      </Text>
                      {/* <Text muted size={1} style={{fontFamily: 'monospace'}}>
                        {cmd.display}
                      </Text> */}

                      <Box style={{flexShrink: 0}}>
                        <Hotkeys keys={cmd.displayKeys} />
                      </Box>
                    </Flex>
                  </Selectable>
                ))
              )}
            </Stack>
          </Card>

          <Box>
            <Text muted size={0}>
              Use ↑↓ to navigate, Enter to select, Esc to close
            </Text>
          </Box>
        </Stack>
      </Box>
    </Dialog>
  )
}
