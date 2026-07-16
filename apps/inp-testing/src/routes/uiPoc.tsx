import '@sanity-labs/ui-poc/styles.css'
import {
  Button,
  Card,
  Checkbox,
  Grid,
  Heading,
  HStack,
  Radio,
  Switch,
  Text,
  Tooltip,
  VStack,
} from '@sanity-labs/ui-poc'
import {useState} from 'react'

// Shared test sizes — keep in sync with ui3.tsx so the comparison stays fair.
const ROW_COUNT = 200
const TONE_CARD_COUNT = 500
const PANEL_CARD_COUNT = 300
const TOOLTIP_COUNT = 300

const scrollAreaStyle = {maxHeight: 260, overflow: 'auto'} as const

// Each section owns its state so a click re-renders that section only —
// the "blast radius" of each interaction is deliberate and isolated.

/** Smallest blast radius: the clicked control re-renders itself and nothing else. */
function SingleControlSection() {
  const [on, setOn] = useState(false)
  const [choice, setChoice] = useState<'one' | 'two'>('one')

  return (
    <Card density="regular">
      <VStack gap={3}>
        <Text size={1} weight="semibold">
          1. Single control
        </Text>
        <Text size={1}>Blast radius: this control only.</Text>
        <Switch
          label={on ? 'Switch is on' : 'Switch is off'}
          checked={on}
          onChange={() => setOn((value) => !value)}
        />
        <Radio
          name="single-radios"
          label="Radio one"
          checked={choice === 'one'}
          onChange={() => setChoice('one')}
        />
        <Radio
          name="single-radios"
          label="Radio two"
          checked={choice === 'two'}
          onChange={() => setChoice('two')}
        />
      </VStack>
    </Card>
  )
}

/** Medium blast radius: one click updates every row's checked state. */
function SelectAllSection() {
  const [checked, setChecked] = useState<boolean[]>(() => Array(ROW_COUNT).fill(false))
  const allChecked = checked.every(Boolean)

  return (
    <Card density="regular">
      <VStack gap={3}>
        <Text size={1} weight="semibold">
          2. Select all ({ROW_COUNT} rows)
        </Text>
        <Text size={1}>One click re-renders all {ROW_COUNT} rows.</Text>
        <Checkbox
          label={allChecked ? 'Deselect all' : 'Select all'}
          checked={allChecked}
          onChange={() => setChecked(Array(ROW_COUNT).fill(!allChecked))}
        />
        <div style={scrollAreaStyle}>
          <VStack gap={2}>
            {checked.map((value, index) => (
              <Checkbox
                // Fixed-length list that never reorders — index is a stable key here.
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                label={`Row ${index + 1}`}
                checked={value}
                onChange={() =>
                  setChecked((previous) => previous.map((v, i) => (i === index ? !v : v)))
                }
              />
            ))}
          </VStack>
        </div>
      </VStack>
    </Card>
  )
}

/** Large blast radius, style-focused: one click changes a style prop on every card. */
function ToneToggleSection() {
  const [tone, setTone] = useState<'neutral' | 'caution'>('neutral')

  return (
    <Card density="regular">
      <VStack gap={3}>
        <Text size={1} weight="semibold">
          3. Tone toggle ({TONE_CARD_COUNT} cards)
        </Text>
        <Text size={1}>One click restyles all {TONE_CARD_COUNT} cards.</Text>
        <div>
          <Button
            text={`Set tone: ${tone === 'neutral' ? 'caution' : 'neutral'}`}
            onClick={() => setTone((value) => (value === 'neutral' ? 'caution' : 'neutral'))}
          />
        </div>
        <div style={scrollAreaStyle}>
          <Grid gridTemplateColumns="repeat(5, 1fr)" gap={2}>
            {Array.from({length: TONE_CARD_COUNT}, (_, index) => (
              <Card key={index} density="compact" tone={tone}>
                <Text size={1}>Card {index + 1}</Text>
              </Card>
            ))}
          </Grid>
        </div>
      </VStack>
    </Card>
  )
}

/** Mount cost: one click renders (or removes) a large panel from scratch. */
function PanelSwapSection() {
  const [open, setOpen] = useState(false)

  return (
    <Card density="regular">
      <VStack gap={3}>
        <Text size={1} weight="semibold">
          4. Panel swap ({PANEL_CARD_COUNT} cards)
        </Text>
        <Text size={1}>One click mounts or unmounts {PANEL_CARD_COUNT} cards.</Text>
        <div>
          <Button
            text={open ? 'Close panel' : 'Open panel'}
            onClick={() => setOpen((value) => !value)}
          />
        </div>
        {open && (
          <div style={scrollAreaStyle}>
            <Grid gridTemplateColumns="repeat(5, 1fr)" gap={2}>
              {Array.from({length: PANEL_CARD_COUNT}, (_, index) => (
                <Card key={index} density="compact">
                  <Text size={1}>Item {index + 1}</Text>
                </Card>
              ))}
            </Grid>
          </div>
        )}
      </VStack>
    </Card>
  )
}

/** Mount cost: one click renders (or removes) a large set of tooltip-wrapped triggers. */
function TooltipMountSection() {
  const [open, setOpen] = useState(false)
  const [clickVariant, setClickVariant] = useState(0)

  const handleTriggerClick = () => console.log(`Tooltip trigger clicked (variant ${clickVariant})`)

  return (
    <Card density="regular">
      <VStack gap={3}>
        <Text size={1} weight="semibold">
          5. Tooltip mount ({TOOLTIP_COUNT} tooltips)
        </Text>
        <Text size={1}>One click mounts or unmounts {TOOLTIP_COUNT} tooltip-wrapped buttons.</Text>
        <HStack gap={2}>
          <Button
            text={open ? 'Close panel' : 'Open panel'}
            onClick={() => setOpen((value) => !value)}
          />
          <Button
            text={`Update onClick prop (variant ${clickVariant})`}
            onClick={() => setClickVariant((value) => value + 1)}
          />
        </HStack>

        {open && (
          <div style={scrollAreaStyle}>
            <HStack gap={2}>
              {Array.from({length: TOOLTIP_COUNT}, (_, index) => (
                <Tooltip key={index}>
                  <Tooltip.Trigger as={Button} text="Open Tooltip" onClick={handleTriggerClick} />
                  <Tooltip.Content text="Tooltip text" />
                </Tooltip>
              ))}
            </HStack>
          </div>
        )}
      </VStack>
    </Card>
  )
}

function UiPoc() {
  return (
    <VStack gap={4}>
      <Heading>UI POC</Heading>
      <SingleControlSection />
      <SelectAllSection />
      <ToneToggleSection />
      <PanelSwapSection />
      <TooltipMountSection />
    </VStack>
  )
}

export default UiPoc
