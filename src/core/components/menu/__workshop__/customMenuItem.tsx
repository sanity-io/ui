import {Box, Card, LayerProvider, Menu, MenuDivider, MenuItem, Stack, Text} from '@sanity/ui'

export default function CustomMenuItemStory(): React.JSX.Element {
  return (
    <Box padding={[4, 5, 6]}>
      <Card radius={3} shadow={2}>
        <LayerProvider>
          <Menu>
            <MenuItem padding={3}>
              <Stack gap={3}>
                <Text weight="medium" size={1}>
                  First option
                </Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
            <MenuItem padding={3}>
              <Stack gap={3}>
                <Text weight="medium" size={1}>
                  Second option
                </Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
            <MenuDivider />
            <MenuItem padding={3} tone="critical">
              <Stack gap={3}>
                <Text weight="medium" size={1}>
                  Dangerous option
                </Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
          </Menu>
        </LayerProvider>
      </Card>
    </Box>
  )
}
