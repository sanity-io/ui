import {Card, LayerProvider, Menu, MenuDivider, MenuItem, Stack, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function CustomMenuItemStory(): React.JSX.Element {
  return (
    <CardWrapper pattern="halftone" tone="transparent" width={0}>
      <Card radius={4} shadow={2}>
        <LayerProvider>
          <Menu>
            <MenuItem padding={3}>
              <Stack gap={3}>
                <Text size={1} weight="medium">
                  First option
                </Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
            <MenuItem padding={3}>
              <Stack gap={3}>
                <Text size={1} weight="medium">
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
                <Text size={1} weight="medium">
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
    </CardWrapper>
  )
}
