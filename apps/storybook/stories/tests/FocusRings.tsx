import {
  ClockIcon,
  CommentIcon,
  ExpandIcon,
  OkHandIcon,
  RocketIcon,
  SearchIcon,
  SunIcon,
} from '@sanity/icons'
import {Autocomplete} from '@sanity/ui/components/autocomplete'
import {Menu, MenuButton, MenuDivider, MenuItem} from '@sanity/ui/components/menu'
import {Tab, TabList} from '@sanity/ui/components/tab'
import {Avatar} from '@sanity/ui/primitives/avatar'
import {Button} from '@sanity/ui/primitives/button'
import {Card} from '@sanity/ui/primitives/card'
import {Checkbox} from '@sanity/ui/primitives/checkbox'
import {Flex} from '@sanity/ui/primitives/flex'
import {Heading} from '@sanity/ui/primitives/heading'
import {Radio} from '@sanity/ui/primitives/radio'
import {Select} from '@sanity/ui/primitives/select'
import {Stack} from '@sanity/ui/primitives/stack'
import {Switch} from '@sanity/ui/primitives/switch'
import {Text} from '@sanity/ui/primitives/text'
import {TextArea} from '@sanity/ui/primitives/text-area'
import {TextInput} from '@sanity/ui/primitives/text-input'
// import {
//   Autocomplete,
//   Avatar,
//   Button,
//   Card,
//   Checkbox,
//   Flex,
//   Heading,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   PortalProvider,
//   Radio,
//   Select,
//   Stack,
//   Switch,
//   Tab,
//   TabList,
//   Text,
//   TextArea,
//   TextInput,
// } from '@sanity/ui'
import {CARD_TONES, ELEMENT_TONES} from '@sanity/ui/theme'
import {PortalProvider} from '@sanity/ui/utils/portal'
import {type ReactNode, useState} from 'react'

const Wrapper = ({children, title}: {children: ReactNode; title: string}) => {
  return (
    <Stack gap={3}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {children}
    </Stack>
  )
}

export function FocusRings(): ReactNode {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card padding={5} scheme="light" tone="default">
      <PortalProvider element={portalElement}>
        <Stack gap={7}>
          <Stack gap={6}>
            <Heading>Primitives</Heading>
            <Wrapper title="Avatar (as button)">
              <Flex gap={3} wrap="wrap">
                <Avatar as="button" initials="AB" />
                <Avatar as="button" initials="CD" />
                <Avatar as="button" initials="EF" />
              </Flex>
            </Wrapper>
            <Wrapper title="Buttons">
              {ELEMENT_TONES.map((tone) => (
                <Flex key={tone} gap={3} wrap="wrap">
                  <Button text="Button" tone={tone} />
                  <Button mode="bleed" text="Button" tone={tone} />
                  <Button mode="ghost" text="Button" tone={tone} />
                </Flex>
              ))}
            </Wrapper>
            <Wrapper title="Card (as button)">
              <Flex gap={3} wrap="wrap">
                {CARD_TONES.map((tone) => (
                  <Card key={tone} __unstable_focusRing as="button" padding={3} tone={tone}>
                    <Text>{tone}</Text>
                  </Card>
                ))}
              </Flex>
            </Wrapper>
            <Wrapper title="Checkboxes">
              <Flex gap={3} wrap="wrap">
                <Checkbox />
                <Checkbox indeterminate />
                <Checkbox defaultChecked />
                <Checkbox disabled />
              </Flex>
            </Wrapper>
            <Wrapper title="Radios">
              <Flex gap={3} wrap="wrap">
                <Radio />
                <Radio defaultChecked />
                <Radio disabled />
              </Flex>
            </Wrapper>
            <Wrapper title="Selects">
              <Flex gap={3} wrap="wrap">
                <Select>
                  <option>Select...</option>
                </Select>
                <Select readOnly>
                  <option>Select...</option>
                </Select>
                <Select disabled>
                  <option>Select...</option>
                </Select>
              </Flex>
            </Wrapper>
            <Wrapper title="Switches">
              <Flex gap={3} wrap="wrap">
                <Switch />
                <Switch indeterminate />
                <Switch defaultChecked />
                <Switch disabled />
              </Flex>
            </Wrapper>
            <Wrapper title="Text areas">
              <Flex gap={3} wrap="wrap">
                <TextArea placeholder="Default" />
                <TextArea placeholder="Read-only" readOnly />
                <TextArea customValidity="error" placeholder="With error" />
                <TextArea disabled placeholder="Disabled" />
              </Flex>
            </Wrapper>
            <Wrapper title="Text inputs">
              <Flex gap={3} wrap="wrap">
                <TextInput placeholder="Default" />
                <TextInput placeholder="Read-only" readOnly />
                <TextInput customValidity="error" placeholder="With error" />
                <TextInput disabled placeholder="Disabled" />
              </Flex>
            </Wrapper>
          </Stack>
          <Stack gap={6}>
            <Heading>Components</Heading>
            <Wrapper title="Autocomplete">
              <Autocomplete
                icon={SearchIcon}
                id="autocomplete"
                options={[{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]}
                placeholder="Search..."
              />
            </Wrapper>
            <Wrapper title="Menu Button">
              <MenuButton
                button={<Button text="Open" tone="primary" />}
                id="menuButton"
                menu={
                  <Menu>
                    <MenuItem icon={SearchIcon} id="menu-item-1" text="Search" />
                    <MenuItem icon={ClockIcon} id="menu-item-2" text="Clock" />
                    <MenuItem disabled icon={CommentIcon} id="menu-item-3" text="Comment" />
                    <MenuDivider />
                    <MenuItem icon={ExpandIcon} id="menu-item-4" text="Expand" />
                  </Menu>
                }
              />
            </Wrapper>
            <Wrapper title="TabList">
              <TabList gap={2}>
                <Tab
                  key="foo"
                  aria-controls="example-panel-foo"
                  icon={SunIcon}
                  id="foo"
                  label="Foo"
                  selected
                />
                <Tab
                  key="bar"
                  aria-controls="example-panel-bar"
                  icon={RocketIcon}
                  id="bar"
                  label="Bar"
                  selected
                />
                <Tab
                  key="baz"
                  aria-controls="example-panel-baz"
                  icon={OkHandIcon}
                  id="baz"
                  label="Baz"
                  selected
                />
              </TabList>
            </Wrapper>
          </Stack>
        </Stack>
      </PortalProvider>

      <div ref={setPortalElement} />
    </Card>
  )
}
