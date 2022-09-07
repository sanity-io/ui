import {Box, Card, Dialog, Flex, Hotkeys, Menu, Text} from '@sanity/ui'
import {useCommands} from '$sanity/base'

export function CommandPaletteDialog({onClose}: {onClose: () => void}) {
  const commands = useCommands()

  return (
    <Dialog id="command-palette" header="Command palette" onClose={onClose} width={1}>
      {/* <Autocomplete /> */}

      <Menu>
        {commands.map((command, commandIndex) => (
          <Card
            as="button"
            key={commandIndex}
            onClick={() => {
              command.handle()
              onClose()
            }}
            padding={4}
          >
            <Flex align="center">
              <Box flex={1} marginRight={4}>
                <Text>{command.title}</Text>
              </Box>

              <Hotkeys keys={command.shortcut} />
            </Flex>
          </Card>
        ))}
      </Menu>
    </Dialog>
  )
}
