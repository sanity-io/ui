import {
  Button,
  Card,
  Checkbox,
  Grid,
  Heading,
  Inline,
  Popover,
  Radio,
  Stack,
  Switch,
  Text,
  ThemeProvider,
  Tooltip,
} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {useState} from 'react'

// Shared test sizes — keep in sync with uiPoc.tsx so the comparison stays fair.
const ROW_COUNT = 200
const TONE_CARD_COUNT = 500
const PANEL_CARD_COUNT = 300
const TOOLTIP_COUNT = 300
const POPOVER_COUNT = 300

const scrollAreaStyle = {maxHeight: 260, overflow: 'auto'} as const

const theme = buildTheme()

// Each section owns its state so a click re-renders that section only —
// the "blast radius" of each interaction is deliberate and isolated.
// UI 3 controls have no label prop, so labels are hand-built, as in real usage.

/** Smallest blast radius: the clicked control re-renders itself and nothing else. */
function SingleControlSection() {
  const [on, setOn] = useState(false)
  const [choice, setChoice] = useState<'one' | 'two'>('one')

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          1. Single control
        </Text>
        <Text size={1}>Blast radius: this control only.</Text>
        <Inline gap={3}>
          <Switch id="single-switch" checked={on} onChange={() => setOn((value) => !value)} />
          <Text>
            <label htmlFor="single-switch">{on ? 'Switch is on' : 'Switch is off'}</label>
          </Text>
        </Inline>
        <Inline gap={3}>
          <Radio
            name="single-radios"
            id="single-radio-one"
            checked={choice === 'one'}
            onChange={() => setChoice('one')}
          />
          <Text>
            <label htmlFor="single-radio-one">Radio one</label>
          </Text>
        </Inline>
        <Inline gap={3}>
          <Radio
            name="single-radios"
            id="single-radio-two"
            checked={choice === 'two'}
            onChange={() => setChoice('two')}
          />
          <Text>
            <label htmlFor="single-radio-two">Radio two</label>
          </Text>
        </Inline>
      </Stack>
    </Card>
  )
}

/** Medium blast radius: one click updates every row's checked state. */
function SelectAllSection() {
  const [checked, setChecked] = useState<boolean[]>(() => Array(ROW_COUNT).fill(false))
  const allChecked = checked.every(Boolean)

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          2. Select all ({ROW_COUNT} rows)
        </Text>
        <Text size={1}>One click re-renders all {ROW_COUNT} rows.</Text>
        <Inline gap={3}>
          <Checkbox
            id="select-all"
            checked={allChecked}
            onChange={() => setChecked(Array(ROW_COUNT).fill(!allChecked))}
          />
          <Text>
            <label htmlFor="select-all">{allChecked ? 'Deselect all' : 'Select all'}</label>
          </Text>
        </Inline>
        <div style={scrollAreaStyle}>
          <Stack gap={2}>
            {checked.map((value, index) => (
              <Inline
                // Fixed-length list that never reorders — index is a stable key here.
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                gap={3}
              >
                <Checkbox
                  id={`row-${index}`}
                  checked={value}
                  onChange={() =>
                    setChecked((previous) => previous.map((v, i) => (i === index ? !v : v)))
                  }
                />
                <Text>
                  <label htmlFor={`row-${index}`}>Row {index + 1}</label>
                </Text>
              </Inline>
            ))}
          </Stack>
        </div>
      </Stack>
    </Card>
  )
}

/** Large blast radius, style-focused: one click changes a style prop on every card. */
function ToneToggleSection() {
  const [tone, setTone] = useState<'neutral' | 'caution'>('neutral')

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          3. Tone toggle ({TONE_CARD_COUNT} cards)
        </Text>
        <Text size={1}>One click restyles all {TONE_CARD_COUNT} cards.</Text>
        <Inline>
          <Button
            text={`Set tone: ${tone === 'neutral' ? 'caution' : 'neutral'}`}
            onClick={() => setTone((value) => (value === 'neutral' ? 'caution' : 'neutral'))}
          />
        </Inline>
        <div style={scrollAreaStyle}>
          <Grid gridTemplateColumns={5} gap={2}>
            {Array.from({length: TONE_CARD_COUNT}, (_, index) => (
              <Card key={index} padding={3} tone={tone}>
                <Text size={1}>Card {index + 1}</Text>
              </Card>
            ))}
          </Grid>
        </div>
      </Stack>
    </Card>
  )
}

/** Mount cost: one click renders (or removes) a large panel from scratch. */
function PanelSwapSection() {
  const [open, setOpen] = useState(false)

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          4. Panel swap ({PANEL_CARD_COUNT} cards)
        </Text>
        <Text size={1}>One click mounts or unmounts {PANEL_CARD_COUNT} cards.</Text>
        <Inline>
          <Button
            text={open ? 'Close panel' : 'Open panel'}
            onClick={() => setOpen((value) => !value)}
          />
        </Inline>
        {open && (
          <div style={scrollAreaStyle}>
            <Grid gridTemplateColumns={5} gap={2}>
              {Array.from({length: PANEL_CARD_COUNT}, (_, index) => (
                <Card key={index} padding={3}>
                  <Text size={1}>Item {index + 1}</Text>
                </Card>
              ))}
            </Grid>
          </div>
        )}
      </Stack>
    </Card>
  )
}

/** Mount cost: one click renders (or removes) a large set of tooltip-wrapped triggers. */
function TooltipMountSection() {
  const [open, setOpen] = useState(false)
  const [clickVariant, setClickVariant] = useState(0)

  const handleTriggerClick = () => console.log(`Tooltip trigger clicked (variant ${clickVariant})`)

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          5. Tooltip mount ({TOOLTIP_COUNT} tooltips)
        </Text>
        <Text size={1}>One click mounts or unmounts {TOOLTIP_COUNT} tooltip-wrapped buttons.</Text>
        <Inline gap={2}>
          <Button
            text={open ? 'Close panel' : 'Open panel'}
            onClick={() => setOpen((value) => !value)}
          />
          <Button
            text={`Update onClick prop (variant ${clickVariant})`}
            onClick={() => setClickVariant((value) => value + 1)}
          />
        </Inline>

        {open && (
          <div style={scrollAreaStyle}>
            <Inline gap={2}>
              {Array.from({length: TOOLTIP_COUNT}, (_, index) => (
                <Tooltip key={index} content="Tooltip text">
                  <Button text="Open Tooltip" onClick={handleTriggerClick} />
                </Tooltip>
              ))}
            </Inline>
          </div>
        )}
      </Stack>
    </Card>
  )
}

/** Mount cost: one click renders (or removes) a large set of popover-wrapped triggers. */
function PopoverMountSection() {
  const [open, setOpen] = useState(false)

  return (
    <Card tone="neutral" padding={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          5. Popover mount ({POPOVER_COUNT} popovers)
        </Text>
        <Text size={1}>One click mounts or unmounts {TOOLTIP_COUNT} popover-wrapped buttons.</Text>
        <Inline gap={2}>
          <Button
            text={open ? 'Close panel' : 'Open panel'}
            onClick={() => setOpen((value) => !value)}
          />
        </Inline>

        {open && (
          <div style={scrollAreaStyle}>
            <Inline gap={2}>
              {Array.from({length: POPOVER_COUNT}, (_, index) => (
                <Popover key={index} content="Popover text">
                  <Button text="Open Popover" />
                </Popover>
              ))}
            </Inline>
          </div>
        )}
      </Stack>
    </Card>
  )
}

function Ui3() {
  return (
    <ThemeProvider theme={theme}>
      <Stack gap={4}>
        <Heading>UI 3</Heading>
        <SingleControlSection />
        <SelectAllSection />
        <ToneToggleSection />
        <PanelSwapSection />
        <TooltipMountSection />
        <PopoverMountSection />
      </Stack>
    </ThemeProvider>
  )
}

export default Ui3
