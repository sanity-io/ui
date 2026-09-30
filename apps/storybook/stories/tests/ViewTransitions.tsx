import {SearchIcon} from '@sanity/icons/Search'
import {
  Avatar,
  AvatarCounter,
  AvatarStack,
  Badge,
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  ElementQuery,
  Flex,
  Grid,
  Heading,
  Hotkeys,
  Inline,
  KBD,
  Label,
  Layer,
  LayerProvider,
  PortalProvider,
  Radio,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Text,
  TextArea,
  TextInput,
  TextSkeleton,
  ThemeColorProvider,
  Tree,
  TreeItem,
  useElementSize,
  useLayer,
  useMediaIndex,
  VirtualList,
} from '@sanity/ui'
import {Autocomplete} from '@sanity/ui/autocomplete'
import {Breadcrumbs} from '@sanity/ui/breadcrumbs'
import {Code} from '@sanity/ui/code'
import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem} from '@sanity/ui/menu'
import {Popover} from '@sanity/ui/popover'
import {ToastProvider, useToast} from '@sanity/ui/toast'
import {Tooltip, TooltipDelayGroupProvider} from '@sanity/ui/tooltip'
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useId,
  useState,
  ViewTransition,
} from 'react'

import {
  getViewTransitionRecords,
  installViewTransitionMonitor,
  type ViewTransitionRecord,
} from './viewTransitionMonitor'

installViewTransitionMonitor()

export interface ViewTransitionScenario {
  id: string
  title: string
  content: React.ReactNode
  /** Render the scenario's portals inside its own cell, for components that cover their portal */
  contained?: boolean
}

/** Whether the rig has been moved, for scenarios whose props change in the same transition */
const MovedContext = createContext(false)

interface OverlayScenarioProps {
  animate?: boolean
  /** Make the reference fill its cell, so it resizes when the rig moves */
  fill?: boolean
  /** Change the placement when the rig moves */
  flip?: boolean
  portal?: boolean
}

function TooltipScenario(props: OverlayScenarioProps & {arrow?: boolean}) {
  const {fill, flip, ...restProps} = props
  const moved = useContext(MovedContext)

  return (
    <Tooltip
      {...restProps}
      content={<Text size={1}>Tooltip content</Text>}
      placement={flip && moved ? 'top' : 'bottom'}
    >
      <Button mode="ghost" text="Hover me" width={fill ? 'fill' : undefined} />
    </Tooltip>
  )
}

function TooltipGroupScenario() {
  return (
    <TooltipDelayGroupProvider delay={{open: 100, close: 100}}>
      <Inline gap={2}>
        {['One', 'Two', 'Three'].map((text) => (
          <Tooltip content={<Text size={1}>Tooltip {text}</Text>} key={text}>
            <Button mode="bleed" text={text} />
          </Tooltip>
        ))}
      </Inline>
    </TooltipDelayGroupProvider>
  )
}

function PopoverScenario(
  props: OverlayScenarioProps & {
    constrainSize?: boolean
    matchReferenceWidth?: boolean
    /** Only open the popover once the rig has moved */
    openOnMove?: boolean
  },
) {
  const {fill, flip, openOnMove, ...restProps} = props
  const moved = useContext(MovedContext)

  return (
    <Popover
      {...restProps}
      content={
        <Box padding={3}>
          <Text size={1}>Popover content</Text>
        </Box>
      }
      open={openOnMove ? moved : true}
      placement={flip && moved ? 'top' : 'bottom'}
    >
      <Button mode="ghost" text="Popover reference" width={fill ? 'fill' : undefined} />
    </Popover>
  )
}

function BoundaryElementScenario() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card border overflow="auto" radius={2} ref={setBoundaryElement}>
      <BoundaryElementProvider element={boundaryElement}>
        <Box padding={3}>
          <PopoverScenario constrainSize />
        </Box>
      </BoundaryElementProvider>
    </Card>
  )
}

function MenuButtonScenario() {
  const id = useId()

  return (
    <MenuButton
      button={<Button mode="ghost" text="Open menu" width="fill" />}
      id={id}
      menu={
        <Menu>
          <MenuItem icon={SearchIcon} text="Search" />
          <MenuItem text="Another item" />
        </Menu>
      }
      popover={{portal: true}}
    />
  )
}

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Orange', 'Peach'].map(
  (value) => ({value}),
)

function AutocompleteScenario(props: {portal?: boolean}) {
  const id = useId()

  return (
    <Autocomplete
      id={id}
      openButton
      options={FRUITS}
      placeholder="Search fruit"
      popover={{portal: props.portal}}
    />
  )
}

function TabsScenario() {
  const id = useId()
  const [selected, setSelected] = useState('first')
  const tabs = ['first', 'second', 'third']

  return (
    <Stack gap={3}>
      <TabList gap={1}>
        {tabs.map((tab) => (
          <Tab
            aria-controls={`${id}-${tab}-panel`}
            id={`${id}-${tab}-tab`}
            key={tab}
            label={tab}
            onClick={() => setSelected(tab)}
            selected={selected === tab}
          />
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel
          aria-labelledby={`${id}-${tab}-tab`}
          hidden={selected !== tab}
          id={`${id}-${tab}-panel`}
          key={tab}
        >
          <Text size={1}>The {tab} panel</Text>
        </TabPanel>
      ))}
    </Stack>
  )
}

function DialogScenario() {
  const id = useId()

  return (
    <Box style={{minHeight: 180}}>
      <Dialog header="Dialog" id={id} position="absolute" width={0}>
        <Box padding={3}>
          <Text size={1}>Dialog content</Text>
        </Box>
      </Dialog>
    </Box>
  )
}

function LayerInfo() {
  const {isTopLayer, level, size, zIndex} = useLayer()

  return (
    <Text muted size={1}>
      level={level} size={size} zIndex={zIndex} isTopLayer={String(isTopLayer)}
    </Text>
  )
}

function LayerScenario() {
  return (
    <LayerProvider>
      <Stack gap={2}>
        <LayerInfo />
        <Layer>
          <Card padding={2} radius={2} shadow={1}>
            <Stack gap={2}>
              <LayerInfo />
              <Layer>
                <Card padding={2} radius={2} shadow={1}>
                  <LayerInfo />
                </Card>
              </Layer>
            </Stack>
          </Card>
        </Layer>
      </Stack>
    </LayerProvider>
  )
}

function ToastPusher() {
  const toast = useToast()

  useEffect(() => {
    toast.push({closable: true, duration: 60_000, status: 'info', title: 'Toast from the rig'})
  }, [toast])

  return <Text size={1}>Pushes a toast on mount</Text>
}

function ToastScenario() {
  return (
    <ToastProvider>
      <ToastPusher />
    </ToastProvider>
  )
}

function ElementSizeScenario() {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const size = useElementSize(element)

  return (
    <Card padding={3} radius={2} ref={setElement} tone="transparent">
      <Text size={1}>
        {size ? `${Math.round(size.border.width)}×${Math.round(size.border.height)}` : 'Measuring…'}
      </Text>
    </Card>
  )
}

function MediaIndexScenario() {
  return <Text size={1}>Media index: {useMediaIndex()}</Text>
}

const VIRTUAL_ITEMS = Array.from({length: 100}, (_, index) => `Item ${index + 1}`)

export const VIEW_TRANSITION_SCENARIOS: ViewTransitionScenario[] = [
  {
    id: 'avatar',
    title: 'Avatar',
    content: (
      <Inline gap={2}>
        <Avatar color="blue" initials="AB" size={1} />
        <AvatarStack maxLength={3} size={1}>
          <Avatar color="magenta" initials="CD" />
          <Avatar color="purple" initials="EF" />
          <Avatar color="orange" initials="GH" />
          <Avatar color="green" initials="IJ" />
        </AvatarStack>
        <AvatarCounter count={42} />
      </Inline>
    ),
  },
  {
    id: 'badge',
    title: 'Badge',
    content: (
      <Inline gap={2}>
        <Badge>Default</Badge>
        <Badge tone="positive">Positive</Badge>
        <Badge tone="critical">Critical</Badge>
      </Inline>
    ),
  },
  {
    id: 'button',
    title: 'Button',
    content: (
      <Inline gap={2}>
        <Button text="Default" />
        <Button icon={SearchIcon} mode="ghost" text="Ghost" />
        <Button loading mode="bleed" text="Loading" />
      </Inline>
    ),
  },
  {
    id: 'card',
    title: 'Card',
    content: (
      <Grid gap={2} gridTemplateColumns={2}>
        <Card padding={3} radius={2} shadow={1}>
          <Text size={1}>Shadow</Text>
        </Card>
        <Card __unstable_focusRing as="button" padding={3} radius={2} tone="primary">
          <Text size={1}>As button</Text>
        </Card>
      </Grid>
    ),
  },
  {
    id: 'typography',
    title: 'Heading, Text, Label and KBD',
    content: (
      <Stack gap={3}>
        <Heading size={1}>Heading</Heading>
        <Text size={1}>
          Text with a <KBD>K</KBD> key
        </Text>
        <Label size={1}>Label</Label>
      </Stack>
    ),
  },
  {
    id: 'hotkeys',
    title: 'Hotkeys',
    content: <Hotkeys keys={['Ctrl', 'Shift', 'P']} />,
  },
  {
    id: 'spinner',
    title: 'Spinner',
    content: (
      <Inline gap={3}>
        <Spinner />
        <Spinner muted size={2} />
      </Inline>
    ),
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    content: (
      <Stack gap={2}>
        <Skeleton animated radius={2} style={{height: 24, width: '60%'}} />
        <TextSkeleton animated delay={200} size={1} style={{width: '100%'}} />
      </Stack>
    ),
  },
  {
    id: 'code',
    title: 'Code',
    content: <Code language="typescript" size={1}>{`const answer: number = 42`}</Code>,
  },
  {
    id: 'inputs',
    title: 'TextInput, TextArea and Select',
    content: (
      <Stack gap={2}>
        <TextInput icon={SearchIcon} placeholder="Text input" />
        <TextArea placeholder="Text area" rows={2} />
        <Select>
          <option>Select an option</option>
          <option>Another option</option>
        </Select>
      </Stack>
    ),
  },
  {
    id: 'toggles',
    title: 'Checkbox, Radio and Switch',
    content: (
      <Inline gap={3}>
        <Checkbox aria-label="Checkbox" defaultChecked />
        <Checkbox aria-label="Indeterminate checkbox" indeterminate />
        <Radio aria-label="Radio" defaultChecked />
        <Switch aria-label="Switch" defaultChecked />
        <Switch aria-label="Indeterminate switch" indeterminate />
      </Inline>
    ),
  },
  {
    id: 'tabs',
    title: 'TabList',
    content: <TabsScenario />,
  },
  {
    id: 'tree',
    title: 'Tree',
    content: (
      <Tree>
        <TreeItem expanded text="Fruits">
          <TreeItem text="Apple" />
          <TreeItem text="Banana" />
        </TreeItem>
        <TreeItem text="Vegetables">
          <TreeItem text="Carrot" />
        </TreeItem>
      </Tree>
    ),
  },
  {
    id: 'breadcrumbs',
    title: 'Breadcrumbs',
    content: (
      <Breadcrumbs maxLength={3} separator={<Text size={1}>/</Text>}>
        {['Root', 'Category A', 'Category B', 'Category C', 'Item'].map((text) => (
          <Text key={text} size={1}>
            {text}
          </Text>
        ))}
      </Breadcrumbs>
    ),
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    content: <TooltipScenario />,
  },
  {
    id: 'tooltip-flip',
    title: 'Tooltip (arrow, placement changes on Move)',
    content: <TooltipScenario arrow flip />,
  },
  {
    id: 'tooltip-animated-portal',
    title: 'Tooltip (animate, portal, resizes on Move)',
    content: <TooltipScenario animate fill portal />,
  },
  {
    id: 'tooltip-delay-group',
    title: 'TooltipDelayGroupProvider',
    content: <TooltipGroupScenario />,
  },
  {
    id: 'popover',
    title: 'Popover (open)',
    content: <PopoverScenario />,
  },
  {
    id: 'popover-flip',
    title: 'Popover (open, placement changes on Move)',
    content: <PopoverScenario flip />,
  },
  {
    id: 'popover-animated-portal',
    title: 'Popover (open, animate, portal, resizes on Move)',
    content: <PopoverScenario animate fill portal />,
  },
  {
    id: 'popover-constrain-size',
    title: 'Popover (open, constrainSize, matchReferenceWidth, portal)',
    content: <PopoverScenario constrainSize fill matchReferenceWidth portal />,
  },
  {
    id: 'popover-open-on-move',
    title: 'Popover (opens on Move)',
    content: <PopoverScenario openOnMove portal />,
  },
  {
    id: 'boundary-element',
    title: 'BoundaryElementProvider',
    content: <BoundaryElementScenario />,
  },
  {
    id: 'menu',
    title: 'Menu',
    content: (
      <LayerProvider>
        <Menu>
          <MenuItem icon={SearchIcon} text="Search" />
          <MenuGroup popover={{placement: 'right'}} text="Submenu">
            <MenuItem text="Nested item" />
          </MenuGroup>
          <MenuDivider />
          <MenuItem text="Delete" tone="critical" />
        </Menu>
      </LayerProvider>
    ),
  },
  {
    id: 'menu-button',
    title: 'MenuButton (portal, resizes on Move)',
    content: <MenuButtonScenario />,
  },
  {
    id: 'autocomplete',
    title: 'Autocomplete',
    content: <AutocompleteScenario />,
  },
  {
    id: 'autocomplete-portal',
    title: 'Autocomplete (portal, resizes on Move)',
    content: <AutocompleteScenario portal />,
  },
  {
    id: 'dialog',
    title: 'Dialog',
    content: <DialogScenario />,
    contained: true,
  },
  {
    id: 'layer',
    title: 'Layer',
    content: <LayerScenario />,
  },
  {
    id: 'toast',
    title: 'ToastProvider',
    content: <ToastScenario />,
  },
  {
    id: 'theme-color-provider',
    title: 'ThemeColorProvider',
    content: (
      <ThemeColorProvider tone="positive">
        <Card padding={3} radius={2} tone="inherit">
          <Text size={1}>Positive tone</Text>
        </Card>
      </ThemeColorProvider>
    ),
  },
  {
    id: 'element-query',
    title: 'ElementQuery',
    content: (
      <ElementQuery media={[100, 200, 300]}>
        <Card padding={3} radius={2} tone="caution">
          <Text size={1}>Inside an element query</Text>
        </Card>
      </ElementQuery>
    ),
  },
  {
    id: 'use-element-size',
    title: 'useElementSize',
    content: <ElementSizeScenario />,
  },
  {
    id: 'use-media-index',
    title: 'useMediaIndex',
    content: <MediaIndexScenario />,
  },
  {
    id: 'virtual-list',
    title: 'VirtualList',
    content: (
      <Card border overflow="auto" radius={2} style={{height: 120}}>
        <VirtualList
          getItemKey={(item: string) => item}
          items={VIRTUAL_ITEMS}
          renderItem={(item: string) => (
            <Box padding={2}>
              <Text size={1}>{item}</Text>
            </Box>
          )}
        />
      </Card>
    ),
  },
]

function Cell(props: {mounted: boolean; scenario: ViewTransitionScenario}) {
  const {mounted, scenario} = props
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  const content = mounted && (
    <ViewTransition enter="vt-rig-enter" exit="vt-rig-exit">
      <div>{scenario.content}</div>
    </ViewTransition>
  )

  return (
    <ViewTransition>
      <Card
        border
        data-scenario={scenario.id}
        padding={3}
        radius={3}
        style={{position: 'relative'}}
      >
        <Stack gap={3}>
          <Label muted size={0}>
            {scenario.title}
          </Label>
          {scenario.contained ? (
            <PortalProvider element={portalElement}>{content}</PortalProvider>
          ) : (
            content
          )}
        </Stack>
        {scenario.contained && <div ref={setPortalElement} />}
      </Card>
    </ViewTransition>
  )
}

function describeRecord(record: ViewTransitionRecord): string {
  if (record.skippedBy || record.error) return `skipped: ${record.error ?? 'skipTransition()'}`
  if (record.readyAt === null) return 'preparing…'
  if (record.finishedAt === null) return 'animating…'

  return `animated for ${Math.round(record.finishedAt - record.readyAt)}ms`
}

/**
 * Polls the monitor instead of subscribing to it, so the log only ever renders at default
 * priority and can't be the synchronous render that interrupts a transition
 */
function TransitionLog() {
  const [records, setRecords] = useState(getViewTransitionRecords)

  useEffect(() => {
    const interval = setInterval(() => setRecords(getViewTransitionRecords()), 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card border padding={3} radius={3}>
      <Stack gap={3}>
        <Label muted size={0}>
          View transitions
        </Label>
        {records.length === 0 && (
          <Text muted size={1}>
            None yet
          </Text>
        )}
        {records.map((record) => (
          <Card
            key={record.id}
            padding={2}
            radius={2}
            tone={record.skippedBy || record.error ? 'critical' : 'transparent'}
          >
            <Stack gap={2}>
              <Text size={1} weight="medium">
                #{record.id} {describeRecord(record)}
              </Text>
              {record.skippedBy && (
                <Code size={0} style={{whiteSpace: 'pre-wrap'}}>
                  {record.skippedBy}
                </Code>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  )
}

/**
 * @internal
 */
export interface ViewTransitionsProps {
  /** How long every view transition animation runs, in milliseconds */
  duration: number
  /** The `id`s of the scenarios to render, all of them when omitted */
  scenarios?: string[]
}

/**
 * Renders Sanity UI components in `<ViewTransition>` boundaries with slow animations
 */
export function ViewTransitions(props: ViewTransitionsProps): React.JSX.Element {
  const {duration, scenarios} = props
  const [mounted, setMounted] = useState(false)
  const [moved, setMoved] = useState(false)
  const selected = VIEW_TRANSITION_SCENARIOS.filter(
    (scenario) => !scenarios || scenarios.includes(scenario.id),
  )
  const ordered = moved ? [...selected].reverse() : selected

  return (
    <Stack gap={4} padding={4}>
      <style>{`
        ::view-transition-group(*),
        ::view-transition-image-pair(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
          animation-duration: ${duration}ms;
        }
        ::view-transition-group(root),
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
        }
        ::view-transition-new(.vt-rig-enter):only-child {
          animation-name: vt-rig-enter;
        }
        ::view-transition-old(.vt-rig-exit):only-child {
          animation-name: vt-rig-exit;
        }
        @keyframes vt-rig-enter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.9);
          }
        }
        @keyframes vt-rig-exit {
          to {
            opacity: 0;
            transform: translateY(-24px) scale(0.9);
          }
        }
      `}</style>

      <Flex align="center" gap={2} wrap="wrap">
        <Button
          onClick={() => startTransition(() => setMounted((current) => !current))}
          text={mounted ? 'Unmount' : 'Mount'}
          tone="primary"
        />
        <Button
          mode="ghost"
          onClick={() => startTransition(() => setMoved((current) => !current))}
          text="Move"
        />
        <Text muted size={1}>
          Animations run for {duration}ms
        </Text>
      </Flex>

      <TransitionLog />

      <MovedContext value={moved}>
        <Grid
          gap={3}
          gridTemplateColumns={moved ? 2 : 3}
          style={{marginTop: moved ? 48 : 0, maxWidth: moved ? 720 : undefined}}
        >
          {ordered.map((scenario) => (
            <Cell key={scenario.id} mounted={mounted} scenario={scenario} />
          ))}
        </Grid>
      </MovedContext>
    </Stack>
  )
}
