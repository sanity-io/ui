import {ReactNode} from 'react'

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
} from '../../../src/components'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
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
} from '../../../src/primitives'
import {ThemeColorSchemeKey, ThemeProvider, studioTheme} from '../../../src/theme'
import {cssVars} from '../../../src/theme/lib/theme/color/cssVariables/createCssVars'

const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const

const SkeletonComponent = () => (
  <Box padding={[4, 5, 6]}>
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

export function Tones({scheme}: {scheme: ThemeColorSchemeKey}): ReactNode {
  const props = {
    padding: 4,
    radius: 2,
    shadow: 1,
  }

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <Card padding={2} radius={2}>
        <Flex gap={2} paddingTop={2} wrap={'wrap'} width={1400}>
          {tones.map((tone) => (
            <Card tone={tone} {...props} key={tone}>
              <Stack space={2}>
                <Heading>Heading</Heading>
                <Text>Text</Text>
                <Label>Label</Label>
                <Flex gap={2}>
                  <Badge>Badge</Badge>
                  <Badge mode="outline">Badge</Badge>
                </Flex>
                <TextInput placeholder="placeholder" />
                <TextInput value="Value" />
                <TextArea value="TextArea" />
                {/* <TextArea value="CAUTION TONE" tone="caution" /> */}

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
                <Hotkeys keys={['Ctrl', 'Shift', 'P']} padding={2} />
                <Stack
                  space={2}
                  padding={2}
                  marginY={2}
                  style={{
                    boxShadow: `0 0 0 2px ${cssVars.default['border-base']}`, // You can access the vars from custom components :rocket:
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
                    boxShadow: `0 0 0 2px ${cssVars.default['border-base']}`, // You can access the vars from custom components :rocket:
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
                <Text weight="semibold" size={2} muted>
                  Avatars
                </Text>
                <Flex gap={2}>
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
                <Flex gap={2} padding={2}>
                  <Text weight="semibold" size={2} muted>
                    Card as button
                  </Text>
                  <Card tone="inherit" shadow={1} as="button" padding={2} radius={2}>
                    <Text>tone inherit</Text>
                  </Card>
                </Flex>

                <SkeletonComponent />
              </Stack>
            </Card>
          ))}
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
