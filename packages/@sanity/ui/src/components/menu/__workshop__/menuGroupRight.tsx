import {
  AddIcon,
  BookIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  ImageIcon,
  TrashIcon,
} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
} from '@sanity/ui'

export default function MenuGroupRightStory() {
  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" padding={4} sizing="border">
        <Container width={1}>
          <Card padding={2} radius={2} shadow={2}>
            <Flex>
              <Box flex={1} />
              <Box>
                <MenuButton
                  button={<Button icon={EllipsisVerticalIcon} mode="bleed" />}
                  id="right-menu"
                  menu={
                    <Menu>
                      <MenuGroup icon={AddIcon} popover={{placement: 'left'}} text="Add above">
                        <MenuItem icon={ImageIcon} text="Image" />
                        <MenuItem icon={BookIcon} text="Book" />
                      </MenuGroup>
                      <MenuGroup icon={AddIcon} popover={{placement: 'left'}} text="Add below">
                        <MenuItem icon={ImageIcon} text="Image" />
                        <MenuItem icon={BookIcon} text="Book" />
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem icon={CopyIcon} text="Duplicate" />
                      <MenuItem icon={TrashIcon} text="Remove" tone="critical" />
                    </Menu>
                  }
                  popover={{placement: 'right', portal: true}}
                />
              </Box>
            </Flex>
          </Card>
        </Container>
      </Flex>
    </Card>
  )
}
