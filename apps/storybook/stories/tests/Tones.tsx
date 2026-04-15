import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CARD_TONES,
  Checkbox,
  Code,
  CodeSkeleton,
  type ColorScheme,
  Container,
  Flex,
  Grid,
  Heading,
  HeadingSkeleton,
  Hotkeys,
  Inline,
  KBD,
  Label,
  LabelSkeleton,
  LayerProvider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Popover,
  PortalProvider,
  Radio,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  Text,
  TextArea,
  TextInput,
  TextSkeleton,
} from '@sanity/ui'
import {type ReactNode, useState} from 'react'

const Wrapper = ({title, children}: {title: string; children: React.ReactNode}) => (
  <Stack gap={2}>
    <Box marginBottom={3}>
      <Text size={1} weight="semibold">
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
        <Grid gap={2} gridTemplateColumns={2} marginRight={3}>
          <Skeleton animated radius={2} style={{width: 40, height: 40}} />
          <Skeleton animated radius={2} style={{width: 40, height: 40}} />
          <Skeleton animated radius={2} style={{width: 40, height: 40}} />
          <Skeleton animated radius={2} style={{width: 40, height: 40}} />
        </Grid>
        <Stack flex={1} gap={2}>
          <HeadingSkeleton animated radius={1} style={{width: '100%'}} />
          <TextSkeleton animated radius={1} style={{width: '100%'}} />
          <LabelSkeleton animated radius={1} style={{width: '100%'}} />
          <CodeSkeleton animated radius={1} style={{width: '100%'}} />
        </Stack>
      </Flex>
      <Flex marginTop={2}>
        <Skeleton animated flex={1} marginRight={1} radius={2} style={{height: 50}} />
        <Skeleton animated flex={1} marginLeft={1} radius={2} style={{height: 50}} />
      </Flex>
    </Container>
  </Box>
)

const PopoverExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      content={<Text size={2}>I'm a popover with a different tone than my parent card</Text>}
      open={isOpen}
      padding={4}
      placement="top"
      portal
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
  } as const

  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  const [scheme, setScheme] = useState<ColorScheme>('light')

  return (
    <Card padding={2} radius={2} scheme="light" tone="default">
      <PortalProvider element={portalElement}>
        <Box padding={3}>
          <Button
            text="Toggle scheme"
            onClick={() => setScheme(scheme === 'light' ? 'dark' : 'light')}
          />
        </Box>
        <Flex gap={2} paddingTop={2} wrap={'wrap'}>
          {CARD_TONES.map((tone) => (
            <Card tone={tone} {...props} key={tone}>
              <Stack gap={6}>
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
                    <Avatar color="blue" initials="AB" />
                    <Avatar color="purple" initials="AB" />
                    <Avatar color="magenta" initials="AB" />
                    <Avatar color="red" initials="AB" />
                    <Avatar color="orange" initials="AB" />
                    <Avatar color="yellow" initials="AB" />
                    <Avatar color="green" initials="AB" />
                    <Avatar color="cyan" initials="AB" />
                  </Flex>
                </Wrapper>
                <Wrapper title="Badge">
                  <Flex>
                    <Badge>Badge</Badge>
                  </Flex>
                </Wrapper>
                <Wrapper title="Button">
                  <Button text={tone} />
                  <Button mode="bleed" text={tone} />
                  <Button mode="bleed" muted text={tone + '-muted'} />
                  <Button mode="ghost" text={tone} />
                  <Button mode="ghost" muted text={tone + '-muted'} />
                </Wrapper>
                <Wrapper title="Card as button (Tone inherit)">
                  <Card as="button" padding={2} radius={2} shadow={1} tone="inherit">
                    <Text>Enabled</Text>
                  </Card>
                  <Card as="button" disabled padding={2} radius={2} shadow={1} tone="inherit">
                    <Text>Disabled</Text>
                  </Card>
                  <Card as="button" padding={2} radius={2} selected shadow={1} tone="inherit">
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
                  <Code language="javascript" size={2}>
                    console.log('Hello, world')
                  </Code>
                  <Flex align={'center'} gap={2} marginTop={1}>
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
                          <Stack gap={2}>
                            <Text size={1} weight="medium">
                              Badge
                            </Text>
                            <Flex>
                              <Badge>Badge</Badge>
                            </Flex>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack gap={2}>
                            <Text size={1} weight="medium">
                              KBD
                            </Text>
                            <Flex>
                              <KBD>Ctrl</KBD>
                            </Flex>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack gap={2}>
                            <Text size={1} weight="medium">
                              Label
                            </Text>
                            <Label>Label</Label>
                          </Stack>
                        </MenuItem>
                        <MenuItem>
                          <Stack gap={2}>
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
                  <Inline gap={3}>
                    <Switch checked />
                    <Switch indeterminate />
                    <Switch />
                  </Inline>
                </Wrapper>
                <Wrapper title="Tab / TabList">
                  <TabList gap={2}>
                    <Tab aria-controls={''} id={''} label="Content" selected />
                    <Tab aria-controls={''} id={''} label="Preview" />
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
      </PortalProvider>

      <div ref={setPortalElement} />
    </Card>
  )
}
