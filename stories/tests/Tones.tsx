import {ReactNode, useState} from 'react'

import { LayerProvider } from '../../src/core/utils/layer/layerProvider'
import { CodeSkeleton, HeadingSkeleton, LabelSkeleton, TextSkeleton } from '../../src/core/components/skeleton/textSkeleton'
import { Hotkeys } from '../../src/core/components/hotkeys/hotkeys'
import { Menu } from '../../src/core/components/menu/menu'
import { MenuButton } from '../../src/core/components/menu/menuButton'
import { MenuDivider } from '../../src/core/components/menu/menuDivider'
import { MenuItem } from '../../src/core/components/menu/menuItem'
import { Skeleton } from '../../src/core/components/skeleton/skeleton'
import { Tab } from '../../src/core/components/tab/tab'
import { TabList } from '../../src/core/components/tab/tabList'
import { Avatar } from '../../src/core/primitives/avatar/avatar'
import { Badge } from '../../src/core/primitives/badge/badge'
import { Box } from '../../src/core/primitives/box/box'
import { Button } from '../../src/core/primitives/button/button'
import { Card } from '../../src/core/primitives/card/card'
import { Checkbox } from '../../src/core/primitives/checkbox/checkbox'
import { Code } from '../../src/core/primitives/code/code'
import { Container } from '../../src/core/primitives/container/container'
import { Flex } from '../../src/core/primitives/flex/flex'
import { Grid } from '../../src/core/primitives/grid/grid'
import { Heading } from '../../src/core/primitives/heading/heading'
import { Inline } from '../../src/core/primitives/inline/inline'
import { KBD } from '../../src/core/primitives/kbd/kbd'
import { Label } from '../../src/core/primitives/label/label'
import { Popover } from '../../src/core/primitives/popover/popover'
import { Radio } from '../../src/core/primitives/radio/radio'
import { Select } from '../../src/core/primitives/select/select'
import { Spinner } from '../../src/core/primitives/spinner/spinner'
import { Stack } from '../../src/core/primitives/stack/stack'
import { Switch } from '../../src/core/primitives/switch/switch'
import { Text } from '../../src/core/primitives/text/text'
import { TextArea } from '../../src/core/primitives/textArea/textArea'
import { TextInput } from '../../src/core/primitives/textInput/textInput'
import { ThemeProvider } from '../../src/core/theme/themeProvider'
import { buildTheme } from '../../src/theme/build/buildTheme'
import { ThemeColorSchemeKey } from '../../src/theme/system/color/_system'

const theme = buildTheme()

const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const

const Wrapper = ({title, children}: {title: string; children: React.ReactNode}) => (
  <Stack space={2}>
    <Box marginBottom={3}>
      <Text weight="semibold" size={1}>
        {title}
      </Text>
    </Box>
    {children}
  </Stack>
)

const SkeletonComponent = () => (
  <Box>
    <Container width={1}>
      <Flex align="center">
        <Grid gap={2} columns={2} marginRight={3}>
          <Skeleton style={{width: 40, height: 40}} radius={2} animated />
          <Skeleton style={{width: 40, height: 40}} radius={2} animated />
          <Skeleton style={{width: 40, height: 40}} radius={2} animated />
          <Skeleton style={{width: 40, height: 40}} radius={2} animated />
        </Grid>
        <Stack space={2} flex={1}>
          <HeadingSkeleton style={{width: '100%'}} radius={1} animated />
          <TextSkeleton style={{width: '100%'}} radius={1} animated />
          <LabelSkeleton style={{width: '100%'}} radius={1} animated />
          <CodeSkeleton style={{width: '100%'}} radius={1} animated />
        </Stack>
      </Flex>
      <Flex marginTop={2}>
        <Skeleton style={{height: 50}} flex={1} marginRight={1} radius={2} animated />
        <Skeleton style={{height: 50}} flex={1} marginLeft={1} radius={2} animated />
      </Flex>
    </Container>
  </Box>
)

const PopoverExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      content={<Text size={2}>I'm a popover with a different tone than my parent card</Text>}
      padding={4}
      placement="top"
      portal
      open={isOpen}
      tone="critical"
    >
      <Button
        mode="ghost"
        padding={[3, 3, 4]}
        text="Popover! "
        onClick={() => setIsOpen(!isOpen)}
      />
    </Popover>
  )
}

export function Tones(): ReactNode {
  const props = {
    padding: 4,
    radius: 2,
    shadow: 1,
  }
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>('light')

  return (
    <ThemeProvider scheme={scheme} theme={theme}>
      <Card padding={2} radius={2}>
        <Box padding={3}>
          <Button
            text="Toggle scheme"
            onClick={() => setScheme(scheme === 'light' ? 'dark' : 'light')}
          />
        </Box>
        <Flex gap={2} paddingTop={2} wrap={'wrap'} width={1400}>
          {tones.map((tone) => (
            <Card tone={tone} {...props} key={tone}>
              <Stack space={6}>
                <Card border padding={2} radius={2} tone={tone}>
                  <Text
                    align="center"
                    size={1}
                    style={{textTransform: 'capitalize'}}
                    weight="semibold"
                  >
                    {tone}
                  </Text>
                </Card>
                <Wrapper title="Avatar">
                  <Flex gap={2} wrap={'wrap'}>
                    <Avatar initials="AB" />
                    <Avatar initials="AB" color="blue" />
                    <Avatar initials="AB" color="cyan" />
                    <Avatar initials="AB" color="gray" />
                    <Avatar initials="AB" color="green" />
                    <Avatar initials="AB" color="magenta" />
                    <Avatar initials="AB" color="orange" />
                    <Avatar initials="AB" color="purple" />
                    <Avatar initials="AB" color="red" />
                    <Avatar initials="AB" color="yellow" />
                  </Flex>
                </Wrapper>
                <Wrapper title="Badge">
                  <Flex>
                    <Badge>Badge</Badge>
                  </Flex>
                </Wrapper>
                <Wrapper title="Button">
                  <Button text={tone} />
                  <Button text={tone} mode="bleed" />
                  <Button text={tone + '-muted'} muted mode="bleed" />
                  <Button text={tone} mode="ghost" />
                  <Button text={tone + '-muted'} muted mode="ghost" />
                </Wrapper>
                <Wrapper title="Card as button (Tone inherit)">
                  <Card tone="inherit" shadow={1} as="button" padding={2} radius={2}>
                    <Text>Enabled</Text>
                  </Card>
                  <Card tone="inherit" disabled shadow={1} as="button" padding={2} radius={2}>
                    <Text>Disabled</Text>
                  </Card>
                  <Card tone="inherit" selected shadow={1} as="button" padding={2} radius={2}>
                    <Text>Selected</Text>
                  </Card>
                </Wrapper>
                <Wrapper title="Checkbox">
                  <Flex gap={2}>
                    <Checkbox checked />
                    <Checkbox checked={false} />
                    <Checkbox indeterminate />
                  </Flex>
                </Wrapper>
                <Wrapper title="Code">
                  <Code size={2} language="javascript">
                    console.log('Hello, world')
                  </Code>
                  <Flex gap={2} align={'center'} marginTop={1}>
                    <Text muted size={1}>
                      Text element with {`<code>`}
                    </Text>
                    <Text>
                      <code>hello world</code>
                    </Text>
                  </Flex>
                </Wrapper>
                <Wrapper title="Heading">
                  <Heading>Heading</Heading>
                </Wrapper>
                <Wrapper title="Hotkeys">
                  <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
                </Wrapper>
                <Wrapper title="KBD">
                  <Flex>
                    <KBD>Ctrl</KBD>
                  </Flex>
                </Wrapper>
                <Wrapper title="Label">
                  <Label>Label</Label>
                </Wrapper>
                <Wrapper title="Menu / MenuButton / MenuDivider / MenuItem">
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
                  <PopoverExample />

                  <Card radius={3} shadow={2} tone="inherit">
                    <LayerProvider>
                      <Menu>
                        <MenuItem text="Plain text" />
                        <MenuItem>
                          <Stack space={2}>
                            <Text size={1} weight="medium">
                              Badge
                            </Text>
                            <Flex>
                              <Badge>Badge</Badge>
                            </Flex>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack space={2}>
                            <Text size={1} weight="medium">
                              KBD
                            </Text>
                            <Flex>
                              <KBD>Ctrl</KBD>
                            </Flex>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack space={2}>
                            <Text size={1} weight="medium">
                              Label
                            </Text>
                            <Label>Label</Label>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack space={2}>
                            <Text size={1} weight="medium">
                              Hotkeys
                            </Text>
                            <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
                          </Stack>
                        </MenuItem>
                      </Menu>
                    </LayerProvider>
                  </Card>
                </Wrapper>
                <Wrapper title="Radio">
                  <Flex gap={2}>
                    <Radio defaultChecked={false} />
                    <Radio defaultChecked={true} />
                  </Flex>
                </Wrapper>
                <Wrapper title="Select">
                  <Select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </Select>
                </Wrapper>
                <Wrapper title="Skeleton">
                  <SkeletonComponent />
                </Wrapper>
                <Wrapper title="Spinner">
                  <Spinner muted />
                </Wrapper>
                <Wrapper title="Switch">
                  <Inline space={3}>
                    <Switch checked />
                    <Switch indeterminate />
                    <Switch />
                  </Inline>
                </Wrapper>
                <Wrapper title="Tab / TabList">
                  <TabList space={2}>
                    <Tab label="Content" selected id={''} aria-controls={''} />
                    <Tab label="Preview" aria-controls={''} id={''} />
                  </TabList>
                </Wrapper>
                <Wrapper title="Text / TextArea / TextInput ">
                  <Box paddingY={2}>
                    <Text>Text</Text>
                  </Box>
                  <TextArea value="TextArea" />
                  <TextInput placeholder="placeholder" />
                  <TextInput value="Value" />
                </Wrapper>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
