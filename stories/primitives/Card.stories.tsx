import type {Meta, StoryObj} from '@storybook/react'
import {Hotkeys, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList} from '../../src/components'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Inline,
  Label,
  Radio,
  Select,
  Spinner,
  Stack,
  Switch,
  Text,
  TextArea,
  TextInput,
} from '../../src/primitives'
import {cssVars} from '../../src/theme/lib/theme/color/cssVars'
import {getRadiusControls, getShadowControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Card> = {
  args: {
    children: <Text>Nested text</Text>,
    padding: 4,
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    radius: getRadiusControls(),
    shadow: getShadowControls(),
  },
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (props) => {
    return <Card {...props} />
  },
}

/**
 * Displays focus ring, hover styles and receives focus events. Requires `__unstable_focusRing`.
 */
export const AsButton: Story = {
  args: {
    __unstable_focusRing: true,
    as: 'button',
    children: <Text>Card as a button</Text>,
    tone: 'transparent',
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} />
      <Card {...props} />
      <Card {...props} />
    </Flex>
  ),
}

export const Borders: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} borderTop>
        <Text>Top</Text>
      </Card>
      <Card {...props} borderBottom>
        <Text>Bottom</Text>
      </Card>
      <Card {...props} borderLeft>
        <Text>Left</Text>
      </Card>
      <Card {...props} borderRight>
        <Text>Right</Text>
      </Card>
      <Card {...props} border>
        <Text>Full</Text>
      </Card>
    </Flex>
  ),
}

export const Radius: Story = {
  args: {
    shadow: 1,
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'shadow', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <Card {...props} radius={radius}>
            <Text>{radius}</Text>
          </Card>
        ),
      })}
    </Flex>
  ),
}

export const Shadows: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding'],
    },
  },
  render: (props) => (
    <Flex gap={7} padding={5} wrap="wrap">
      <Card {...props} shadow={0}>
        <Text>0</Text>
      </Card>
      <Card {...props} shadow={1}>
        <Text>1</Text>
      </Card>
      <Card {...props} shadow={2}>
        <Text>2</Text>
      </Card>
      <Card {...props} shadow={3}>
        <Text>3</Text>
      </Card>
      <Card {...props} shadow={4}>
        <Text>4</Text>
      </Card>
      <Card {...props} shadow={5}>
        <Text>5</Text>
      </Card>
    </Flex>
  ),
}

export const Schemes: Story = {
  args: {
    scheme: 'light',
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Grid columns={5} gapX={2} gapY={3}>
      <Card {...props}>
        <Text>Light (Default)</Text>
      </Card>
      <Card {...props} tone="primary">
        <Text>Light (Primary)</Text>
      </Card>
      <Card {...props} tone="positive">
        <Text>Light (Positive)</Text>
      </Card>
      <Card {...props} tone="caution">
        <Text>Light (Caution)</Text>
      </Card>
      <Card {...props} tone="critical">
        <Text>Light (Critical)</Text>
      </Card>
      <Card {...props} scheme="dark">
        <Text>Dark (Default)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="primary">
        <Text>Dark (Primary)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="positive">
        <Text>Dark (Positive)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="caution">
        <Text>Dark (Caution)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="critical">
        <Text>Dark (Critical)</Text>
      </Card>
    </Grid>
  ),
}
const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const
export const Tones: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => {
    return (
      <Flex gap={2} paddingTop={2}>
        {tones.map((tone) => (
          <Card tone={tone} {...props} key={tone}>
            <Stack space={2}>
              <Heading>Heading</Heading>
              <Text>Text</Text>
              <Label>Label</Label>
              <Flex>
                <Badge>Badge</Badge>
              </Flex>
              <TextInput placeholder="placeholder" />
              <TextInput value="Value" />
              <TextArea value="TextArea" />

              <Select>
                <option>Think</option>
              </Select>
              <Flex gap={2} align={'center'} padding={2}>
                <Text>Avatar</Text>
                <Avatar size={0} />
              </Flex>
              <Flex gap={2} align={'center'} padding={2}>
                <Text>Radio</Text>
                <Flex justify="center" padding={1} gap={2}>
                  {/* TODO: Why is this defaultChecked not showing? */}
                  <Radio defaultChecked={false} />
                  <Radio defaultChecked={true} />
                </Flex>
              </Flex>
              <Flex gap={2} align={'center'} padding={2}>
                <Text>Checkbox</Text>
                <Flex justify="center" padding={1} gap={2}>
                  <Checkbox checked />
                  <Checkbox checked={false} />
                  <Checkbox indeterminate />
                </Flex>
              </Flex>
              <Flex gap={2} align={'center'} padding={2}>
                <Text>Select</Text>
                <Flex justify={'center'} paddingY={2}>
                  <Inline space={[3, 3, 4, 5]}>
                    <Switch checked />
                    <Switch indeterminate />
                    <Switch />
                  </Inline>
                </Flex>
              </Flex>
              <Flex gap={4} align={'center'} padding={2}>
                <Text>Spinner</Text>
                <Spinner muted />
              </Flex>
              <Hotkeys keys={['Ctrl', 'Shift', 'P']} padding={2} />
              <Stack
                space={2}
                padding={2}
                marginY={2}
                style={{
                  boxShadow: `0 0 0 2px ${cssVars.default.border_base}`, // You can access the vars from custom components :rocket:
                  borderRadius: '4px',
                }}
              >
                <Text weight="semibold" size={2} muted>
                  Buttons
                </Text>
                <Button text={tone} />
                <Button text={tone} mode="bleed" />
                <Button text={tone + '-muted'} muted mode="bleed" />
                <Button text={tone} mode="ghost" />
                <Button text={tone + '-muted'} muted mode="ghost" />
              </Stack>
              <Stack
                space={2}
                padding={2}
                style={{
                  boxShadow: `0 0 0 2px ${cssVars.default.border_base}`, // You can access the vars from custom components :rocket:
                  borderRadius: '4px',
                }}
              >
                <Text weight="semibold" size={2} muted>
                  Tabs
                </Text>
                <TabList space={2}>
                  <Tab label="Content" selected id={''} aria-controls={''} />
                  <Tab label="Preview" aria-controls={''} id={''} />
                </TabList>
              </Stack>
              <MenuButton
                button={<Button text="Open menu" />}
                id="menu-button-example"
                menu={
                  <Menu>
                    <MenuItem text="Option 1" />
                    <MenuItem text="Option 2" />
                    <MenuDivider />
                    <MenuItem text="Option 3" />
                  </Menu>
                }
              />
            </Stack>
          </Card>
        ))}
      </Flex>
    )
  },
}
