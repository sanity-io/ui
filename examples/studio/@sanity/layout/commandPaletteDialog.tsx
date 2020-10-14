import {useCommands} from '@sanity/base'
import {Box, Dialog, Flex, Menu, KBD, MenuItem, Text, Inline} from '@sanity/ui'
import React from 'react'

export function CommandPaletteDialog({onClose}: {onClose: () => void}) {
  const commands = useCommands()

  return (
    <Dialog id="command-palette" header="Command palette" onClose={onClose} width={1}>
      {/* <Autocomplete /> */}

      <Menu>
        {commands.map((command, commandIndex) => (
          <MenuItem
            key={commandIndex}
            onClick={() => {
              command.handle()
              onClose()
            }}
          >
            <Flex align="center">
              <Box flex={1} paddingX={4} paddingY={3}>
                <Text>{command.title}</Text>
              </Box>
              <Box paddingX={4} paddingY={3}>
                <Inline space={1}>
                  {command.shortcut.map((key, keyIndex) => (
                    <KBD key={keyIndex}>{key}</KBD>
                  ))}
                </Inline>
              </Box>
            </Flex>
          </MenuItem>
        ))}
      </Menu>
    </Dialog>
  )
}
