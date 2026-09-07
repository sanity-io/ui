/** @vitest-environment jsdom */

import {afterEach, describe, expect, it, vi} from 'vitest'

// oxlint-disable-next-line no-unassigned-import
import '../../test/mocks/matchMedia.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../test/mocks/resizeObserver.mock'
import {render} from '../../test/utils'
import {
  Arrow,
  Avatar,
  AvatarCounter,
  AvatarStack,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  CodeSkeleton,
  Container,
  Dialog,
  ElementQuery,
  ErrorBoundary,
  Flex,
  Grid,
  Heading,
  HeadingSkeleton,
  Hotkeys,
  Inline,
  KBD,
  Label,
  LabelSkeleton,
  Layer,
  LayerProvider,
  Radio,
  Select,
  Skeleton,
  Spinner,
  SrOnly,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Text,
  TextArea,
  TextInput,
  TextSkeleton,
  Tree,
  TreeItem,
  VirtualList,
} from '../exports'
import {Autocomplete} from '../exports/autocomplete'
import {Breadcrumbs} from '../exports/breadcrumbs'
import {Code} from '../exports/code'
import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem} from '../exports/menu'
import {Popover} from '../exports/popover'
import {Toast, ToastProvider} from '../exports/toast'
import {Tooltip} from '../exports/tooltip'

const PUBLIC_IDENTIFIERS = [
  'Arrow',
  'Autocomplete',
  'Avatar',
  'AvatarCounter',
  'AvatarStack',
  'Badge',
  'Box',
  'Breadcrumbs',
  'Button',
  'Card',
  'Checkbox',
  'Code',
  'CodeSkeleton',
  'Container',
  'Dialog',
  'ElementQuery',
  'ErrorBoundary',
  'Flex',
  'Grid',
  'Heading',
  'HeadingSkeleton',
  'Hotkeys',
  'Inline',
  'KBD',
  'Label',
  'LabelSkeleton',
  'Layer',
  'Menu',
  'MenuButton',
  'MenuDivider',
  'MenuGroup',
  'MenuItem',
  'Popover',
  'Radio',
  'Select',
  'Skeleton',
  'Spinner',
  'SrOnly',
  'Stack',
  'Switch',
  'Tab',
  'TabList',
  'TabPanel',
  'Text',
  'TextArea',
  'TextInput',
  'TextSkeleton',
  'Toast',
  'ToastProvider',
  'Tooltip',
  'Tree',
  'TreeItem',
  'VirtualList',
] as const

const COMPOSITE_IDENTIFIERS = [
  'ButtonLoading',
  'DialogContent',
  'DialogFooter',
  'DialogHeader',
  'DialogCard',
  'MenuButton__popover',
  'MenuGroup__popover',
  'PopoverOverlay',
  'Popover__wrapper',
  'SpanWithTextOverflow',
  'ToastLoadingBar',
  'Tooltip__card',
  'TreeGroup',
  'TreeItem__box',
] as const

function Boom(): React.JSX.Element {
  throw new Error('boom')
}

function isExpectedErrorBoundaryLog(args: unknown[]): boolean {
  const hasBoomError = args.some((arg) => arg instanceof Error && arg.message === 'boom')

  if (hasBoomError) return true

  const strings = args.filter((arg): arg is string => typeof arg === 'string')
  const mentionsBoom = strings.some((arg) => arg === 'Boom' || arg.includes('<Boom>'))
  const isReactBoundaryLog = strings.some((arg) => arg.includes('The above error occurred'))

  return mentionsBoom && isReactBoundaryLog
}

function expectIdentifiers(names: readonly string[]) {
  for (const name of names) {
    expect(document.querySelector(`[data-ui="${name}"]`), `data-ui="${name}"`).not.toBeNull()
  }
}

describe('component identifiers', () => {
  const originalError = console.error.bind(console)
  let consoleError: {mockRestore: () => void} | undefined

  afterEach(() => {
    consoleError?.mockRestore()
    consoleError = undefined
  })

  it('identifies exported components with data-ui attributes', {timeout: 15_000}, () => {
    consoleError = vi.spyOn(console, 'error').mockImplementation((...args) => {
      if (isExpectedErrorBoundaryLog(args)) return
      originalError(...args)
    })

    render(
      <>
        <Arrow height={5} width={10} />
        <Autocomplete id="autocomplete" />
        <Avatar initials="AB" />
        <AvatarCounter count={3} />
        <AvatarStack>
          <Avatar initials="AB" />
        </AvatarStack>
        <Badge>Badge</Badge>
        <Box>Box</Box>
        <Breadcrumbs>
          <Text>Home</Text>
          <Text>Docs</Text>
        </Breadcrumbs>
        <Button loading text="Loading" />
        <Card>Card</Card>
        <Checkbox />
        <Code>const x = 1</Code>
        <CodeSkeleton />
        <Container>Container</Container>
        <Dialog footer="Footer" header="Header" id="dialog" onClose={() => {}}>
          Dialog
        </Dialog>
        <ElementQuery>ElementQuery</ElementQuery>
        <ErrorBoundary onCatch={() => {}}>
          <Boom />
        </ErrorBoundary>
        <Flex>Flex</Flex>
        <Grid>Grid</Grid>
        <Heading>Heading</Heading>
        <HeadingSkeleton />
        <Hotkeys keys={['Mod', 'K']} />
        <Inline>Inline</Inline>
        <KBD>K</KBD>
        <Label>Label</Label>
        <LabelSkeleton />
        <Layer>Layer</Layer>
        <LayerProvider>
          <Menu>
            <MenuItem text="Item" />
            <MenuDivider />
            <MenuGroup text="Group">
              <MenuItem text="Nested" />
            </MenuGroup>
          </Menu>
        </LayerProvider>
        <MenuButton button={<Button text="Open" />} id="menu-button" menu={<Menu />} />
        <Popover content="Popover" modal open>
          <Button text="Reference" />
        </Popover>
        <Radio />
        <Select>
          <option value="a">A</option>
        </Select>
        <Skeleton />
        <Spinner />
        <SrOnly>SrOnly</SrOnly>
        <Stack>Stack</Stack>
        <Switch />
        <Tab aria-controls="panel" id="tab" label="Tab" />
        <TabList>
          <Tab aria-controls="panel" id="tab-list-tab" label="Listed" />
          <Tab aria-controls="panel-2" id="tab-list-tab-2" label="Listed 2" />
        </TabList>
        <TabPanel aria-labelledby="tab" id="panel">
          Panel
        </TabPanel>
        <Text textOverflow="ellipsis">Text</Text>
        <TextArea />
        <TextInput />
        <TextSkeleton />
        <Toast duration={100} onClose={() => {}} title="Toast" />
        <ToastProvider>ToastProvider</ToastProvider>
        <Tooltip content="Tooltip">
          <Button text="Hint" />
        </Tooltip>
        <Tree>
          <TreeItem expanded text="Root">
            <TreeItem text="Child" />
          </TreeItem>
        </Tree>
        <VirtualList />
      </>,
    )

    expectIdentifiers(PUBLIC_IDENTIFIERS)
    expectIdentifiers(COMPOSITE_IDENTIFIERS)
  })
})
