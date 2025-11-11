import {
  Button,
  Card,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuLabel,
  Stack,
} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../__workshop__/constants'

export default function MenuLabelStory() {
  const layoutTone = useSelect('Layout tone', WORKSHOP_CARD_TONE_OPTIONS, 'default', 'Props')

  return (
    <Card height="fill" tone="transparent">
      <Flex align="center" height="fill" padding={4} sizing="border">
        <Container width={1}>
            <Card radius={3} shadow={3} padding={3} tone={layoutTone}>
              <Flex justify="center">
              <MenuButton
                button={<Button text="Open" />}
                id="label-example"
                menu={
                  <Menu>
                    <Stack space={1}>
                      <MenuLabel text="Label 1" />
                      <MenuItem text="Item 1" />
                      <MenuItem text="Item 2" />
                    </Stack>
                    <MenuDivider />
                    <MenuLabel text="Label 2" />
                    <MenuItem text="Item 3" />
                  </Menu>
                }
              />

              </Flex>
            </Card>
        </Container>
      </Flex>
    </Card>
  )
}
