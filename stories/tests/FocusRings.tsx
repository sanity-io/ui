import {
  ClockIcon,
  CommentIcon,
  ExpandIcon,
  OkHandIcon,
  RocketIcon,
  SearchIcon,
  SunIcon,
} from '@sanity/icons'
import {ReactNode} from 'react'
import {
  Autocomplete,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Tab,
  TabList,
} from '../../src/core/components'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Radio,
  Select,
  Stack,
  Switch,
  Text,
  TextArea,
  TextInput,
} from '../../src/core/primitives'
import {ThemeProvider} from '../../src/core/theme'
import {defaultTheme} from '../../src/theme'

const Wrapper = ({children, title}: {children: ReactNode; title: string}) => {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {children}
    </Stack>
  )
}

export function FocusRings(): ReactNode {
  return (
    <ThemeProvider scheme="light" theme={defaultTheme}>
      <Card padding={5}>
        <Stack space={7}>
          <Stack space={6}>
            <Heading>Primitives</Heading>
            <Wrapper title="Avatar (as button)">
              <Flex gap={3} wrap="wrap">
                <Avatar as="button" initials="AB" />
                <Avatar as="button" initials="CD" />
                <Avatar as="button" initials="EF" />
              </Flex>
            </Wrapper>
            <Wrapper title="Buttons">
              <Flex gap={3} wrap="wrap">
                <Button text="Button" />
                <Button mode="bleed" text="Button" />
                <Button mode="ghost" text="Button" />
              </Flex>
              <Flex gap={3} wrap="wrap">
                <Button text="Button" tone="primary" />
                <Button mode="bleed" text="Button" tone="primary" />
                <Button mode="ghost" text="Button" tone="primary" />
              </Flex>
              <Flex gap={3} wrap="wrap">
                <Button text="Button" tone="positive" />
                <Button mode="bleed" text="Button" tone="positive" />
                <Button mode="ghost" text="Button" tone="positive" />
              </Flex>
              <Flex gap={3} wrap="wrap">
                <Button text="Button" tone="caution" />
                <Button mode="bleed" text="Button" tone="caution" />
                <Button mode="ghost" text="Button" tone="caution" />
              </Flex>
              <Flex gap={3} wrap="wrap">
                <Button text="Button" tone="critical" />
                <Button mode="bleed" text="Button" tone="critical" />
                <Button mode="ghost" text="Button" tone="critical" />
              </Flex>
            </Wrapper>
            <Wrapper title="Card (as button)">
              <Flex gap={3} wrap="wrap">
                <Card __unstable_focusRing as="button" padding={3} tone="transparent">
                  <Text>Transparent</Text>
                </Card>
                <Card __unstable_focusRing as="button" padding={3} tone="primary">
                  <Text>Primary</Text>
                </Card>
                <Card __unstable_focusRing as="button" padding={3} tone="positive">
                  <Text>Positive</Text>
                </Card>
                <Card __unstable_focusRing as="button" padding={3} tone="caution">
                  <Text>Caution</Text>
                </Card>
                <Card __unstable_focusRing as="button" padding={3} tone="critical">
                  <Text>Critical</Text>
                </Card>
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
          <Stack space={6}>
            <Heading>Components</Heading>
            <Wrapper title="Autocomplete">
              <Autocomplete
                id="autocomplete"
                icon={SearchIcon}
                options={[{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]}
                placeholder="Search..."
              />
            </Wrapper>
            <Wrapper title="Menu Button">
              <MenuButton
                button={<Button tone="primary" text="Open" />}
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
              <TabList space={2}>
                <Tab
                  aria-controls="example-panel-foo"
                  icon={SunIcon}
                  id="foo"
                  label="Foo"
                  key="foo"
                  selected
                />
                <Tab
                  aria-controls="example-panel-bar"
                  icon={RocketIcon}
                  id="bar"
                  label="Bar"
                  key="bar"
                  selected
                />
                <Tab
                  aria-controls="example-panel-baz"
                  icon={OkHandIcon}
                  id="baz"
                  label="Baz"
                  key="baz"
                  selected
                />
              </TabList>
            </Wrapper>
          </Stack>
        </Stack>
      </Card>
    </ThemeProvider>
  )
}
