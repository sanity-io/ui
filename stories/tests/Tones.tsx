import {ReactNode, useState} from 'react'

import {
  CodeSkeleton,
  HeadingSkeleton,
  Hotkeys,
  LabelSkeleton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Skeleton,
  Tab,
  TabList,
  TextSkeleton,
} from '../../src/components'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  Inline,
  KBD,
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
import {ThemeColorSchemeKey, ThemeProvider, studioTheme} from '../../src/theme'

const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const

const Wrapper = ({title, children}: {title: string; children: React.ReactNode}) => (
  <Stack space={2} marginTop={2} paddingY={2}>
    <Text weight="semibold" size={2}>
      {title}
    </Text>
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

export function Tones(): ReactNode {
  const props = {
    padding: 4,
    radius: 2,
    shadow: 1,
  }
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>('light')

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
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
              <Stack space={2}>
                <Heading style={{textTransform: 'capitalize'}}>{tone}</Heading>
                <Text>Text</Text>
                <Label>Label</Label>
                <Flex gap={2}>
                  <Badge>Badge</Badge>
                  <Badge mode="outline">Badge</Badge>
                </Flex>
                <Wrapper title="Inputs">
                  <TextInput placeholder="placeholder" />
                  <TextInput value="Value" />
                  <TextInput value="with tone (caution)" tone="caution" />
                  <TextArea value="TextArea" />
                  <Select>
                    <option>Think</option>
                  </Select>
                  <Flex gap={2} align={'center'} padding={2}>
                    <Text>Avatar</Text>
                    <Avatar size={0} initials="PB" />
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
                    <Text>Switch</Text>
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
                </Wrapper>
                <Wrapper title="Buttons">
                  <Button text={tone} />
                  <Button text={tone} mode="bleed" />
                  <Button text={tone + '-muted'} muted mode="bleed" />
                  <Button text={tone} mode="ghost" />
                  <Button text={tone + '-muted'} muted mode="ghost" />
                </Wrapper>
                <Wrapper title="Hotkeys and KBD">
                  <Hotkeys keys={['Ctrl', 'Shift', 'P']} padding={2} />
                  <Flex>
                    <KBD padding={2}> Ctrl </KBD>
                  </Flex>
                </Wrapper>
                <Wrapper title="Tabs">
                  <TabList space={2}>
                    <Tab label="Content" selected id={''} aria-controls={''} />
                    <Tab label="Preview" aria-controls={''} id={''} />
                  </TabList>
                </Wrapper>
                <Wrapper title="Menu">
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
                </Wrapper>
                <Wrapper title="Avatars">
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
                <Wrapper title="Skeleton">
                  <SkeletonComponent />
                </Wrapper>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
