import {COLOR_TINTS, ColorTints} from '@sanity/color'
import {ChevronDownIcon} from '@sanity/icons/ChevronDown'
import {ChevronRightIcon} from '@sanity/icons/ChevronRight'
import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {CloseIcon} from '@sanity/icons/Close'
import {ResetIcon} from '@sanity/icons/Reset'
import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Grid,
  Select,
  Stack,
  Text,
  TextInput,
  useToast,
} from '@sanity/ui'
import {useMemo, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import typescript from 'refractor/typescript'
import {styled} from 'styled-components'

import {parseHuesFromUrl} from '../legacy/createTheme'
import {createTonesFromHues} from '../legacy/createTonesFromHues'
import {presets} from '../legacy/presets'
import {Hue, ThemePreset} from '../legacy/types'
import {useThemer} from './context'
import {HUE_FIELDS, HUE_KEYS, HueField, HueKey, MID_POINTS, sameHues} from './hues'
import {createThemeSnippet} from './snippet'

// `Code` only highlights languages the surrounding app has registered with
// react-refractor, and the Studio registers its own set from an async import
// during startup — a race this sidebar keeps losing. Registering the one
// language the snippet needs keeps it highlighted from the first render.
registerLanguage(typescript)

/**
 * The tool's take on the hosted service's presets: Tailwind Cyan is hidden and
 * the default "Studio v3" preset reads just "Studio". The legacy `presets`
 * export itself keeps both untouched, for parity with
 * `https://themer.sanity.build/api/hues`.
 */
const TOOL_PRESETS: ThemePreset[] = []

for (const preset of presets) {
  if (preset.slug === 'tw-cyan') continue

  TOOL_PRESETS.push(preset.slug === 'default' ? {...preset, title: 'Studio'} : preset)
}

/**
 * `<input type="color">` paints the color into a shadow-DOM swatch that brings
 * its own border and padding, which then sits inside ours as a second border.
 * Stripping that chrome leaves the themed border as the only one.
 */
const Swatch = styled.input`
  box-sizing: border-box;
  flex: none;
  width: 33px;
  height: 33px;
  padding: 0;
  border: 1px solid var(--card-border-color);
  border-radius: 4px;
  background: none;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 3px;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 3px;
  }
`

/** Expands `#abc` to `#aabbcc`, which is the only format `<input type="color">` accepts */
function expandHex(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }

  return hex
}

/** Prefixes bare query strings so `parseHuesFromUrl` accepts them too */
function normalizeImportUrl(input: string): string {
  const trimmed = input.trim()

  return trimmed.startsWith('http') || trimmed.startsWith('?') ? trimmed : `?${trimmed}`
}

/**
 * The themer sidebar: presets, a themer.sanity.build URL importer and the
 * per-hue editors of the hosted Themer service — mid color, mid point,
 * lightest and darkest — that generate the previewed legacy theme, plus the
 * `createTheme` snippet to make it permanent.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {baseHues, hues, setHues, setOpen} = useThemer()
  const toast = useToast()
  const [expandedHue, setExpandedHue] = useState<HueKey | null>(null)
  const [importUrl, setImportUrl] = useState('')

  const active = hues ?? baseHues
  const tones = useMemo(() => createTonesFromHues(active), [active])
  const activePresetSlug = TOOL_PRESETS.find((preset) => sameHues(preset.hues, active))?.slug ?? ''
  const snippet = createThemeSnippet(active)

  const handleHueChange = (key: HueKey, patch: Partial<Hue>) => {
    setHues({...active, [key]: {...active[key], ...patch}})
  }

  const handlePresetChange = (slug: string) => {
    const preset = TOOL_PRESETS.find((candidate) => candidate.slug === slug)

    if (preset) {
      setHues(preset.hues)
    }
  }

  const handleImport = () => {
    if (!importUrl.trim()) return

    try {
      setHues(parseHuesFromUrl(normalizeImportUrl(importUrl)))
      setImportUrl('')
      toast.push({status: 'success', title: 'Imported theme from URL'})
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Could not import the URL',
        description: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      toast.push({status: 'success', title: 'Copied theme to the clipboard'})
    } catch {
      toast.push({status: 'error', title: 'Could not copy the theme'})
    }
  }

  return (
    <Card height="fill">
      <Flex direction="column" height="fill">
        <Card borderBottom padding={3}>
          <Flex align="center" gap={2}>
            <Box flex={1} paddingLeft={1}>
              <Text size={1} weight="semibold">
                Themer
              </Text>
            </Box>
            <Button
              icon={CloseIcon}
              mode="bleed"
              onClick={() => setOpen(false)}
              padding={2}
              title="Close themer"
            />
          </Flex>
        </Card>

        <Box flex={1} overflow="auto" padding={3}>
          <Stack gap={4}>
            <Stack gap={3}>
              <Text size={1} weight="medium">
                Presets
              </Text>
              <Grid gap={2} gridTemplateColumns={2}>
                {TOOL_PRESETS.map((preset) => (
                  <PresetButton
                    active={preset.slug === activePresetSlug}
                    key={preset.slug}
                    onClick={handlePresetChange}
                    preset={preset}
                  />
                ))}
              </Grid>
            </Stack>

            <Stack gap={3}>
              <Text size={1} weight="medium">
                Import
              </Text>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  handleImport()
                }}
              >
                <Flex gap={2}>
                  <Box flex={1}>
                    <TextInput
                      aria-label="Hosted Themer URL"
                      fontSize={1}
                      onChange={(event) => setImportUrl(event.currentTarget.value)}
                      padding={2}
                      placeholder="themer.sanity.build URL"
                      value={importUrl}
                    />
                  </Box>
                  <Button mode="ghost" padding={2} text="Import" type="submit" />
                </Flex>
              </form>
            </Stack>

            <Stack gap={3}>
              <Text size={1} weight="medium">
                Hues
              </Text>
              <Stack gap={1}>
                {HUE_FIELDS.map((field) => (
                  <HueSection
                    expanded={expandedHue === field.key}
                    field={field}
                    hue={active[field.key]}
                    key={field.key}
                    onChange={handleHueChange}
                    onToggle={() => setExpandedHue(expandedHue === field.key ? null : field.key)}
                    tints={tones[field.key]}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack gap={3}>
              <Text size={1} weight="medium">
                Add to your config
              </Text>
              <Card border overflow="auto" padding={2} radius={2} tone="transparent">
                <Code language="ts" size={0}>
                  {snippet}
                </Code>
              </Card>
              <Flex gap={2}>
                <Button
                  icon={ClipboardIcon}
                  mode="ghost"
                  onClick={() => void handleCopy()}
                  text="Copy"
                />
                <Button
                  disabled={hues === null}
                  icon={ResetIcon}
                  mode="ghost"
                  onClick={() => setHues(null)}
                  text="Reset"
                  tone="critical"
                />
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Card>
  )
}

const paletteStyle: React.CSSProperties = {
  display: 'flex',
  // The gaps let the border color through, so a near-white light background
  // still reads as a swatch rather than a hole in the palette
  gap: 1,
  background: 'var(--card-border-color)',
  height: 21,
  borderRadius: 3,
  overflow: 'hidden',
  boxShadow: 'inset 0 0 0 1px var(--card-border-color)',
}

/** A little color palette of the hue mid colors a preset would apply */
function PresetButton(props: {
  active: boolean
  onClick: (slug: string) => void
  preset: ThemePreset
}) {
  const {active, onClick, preset} = props

  return (
    <Button
      mode="ghost"
      onClick={() => onClick(preset.slug)}
      padding={2}
      selected={active}
      title={preset.title}
    >
      <Stack as="span" gap={2}>
        <span style={paletteStyle}>
          {HUE_KEYS.map((key) => (
            <span key={key} style={{flex: 1, background: preset.hues[key].mid}} />
          ))}
        </span>
        <Text align="left" size={1} textOverflow="ellipsis">
          {preset.title}
        </Text>
      </Stack>
    </Button>
  )
}

const rampStyle: React.CSSProperties = {
  ...paletteStyle,
  height: 13,
  borderRadius: 2,
}

/** One hue of the theme: a collapsible header with the generated tint ramp */
function HueSection(props: {
  expanded: boolean
  field: HueField
  hue: Hue
  onChange: (key: HueKey, patch: Partial<Hue>) => void
  onToggle: () => void
  /** The hue's generated 50–950 tint ramp, for the header preview */
  tints: ColorTints
}) {
  const {expanded, field, hue, onChange, onToggle, tints} = props

  return (
    <Card border={expanded} radius={2} tone={expanded ? 'transparent' : undefined}>
      <Stack gap={expanded ? 3 : 0} paddingBottom={expanded ? 3 : 0}>
        <Button
          aria-expanded={expanded}
          mode="bleed"
          onClick={onToggle}
          padding={2}
          title={field.description}
        >
          <Flex align="center" as="span" gap={2}>
            <Text size={1}>{expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}</Text>
            <Box as="span" style={{width: 76}}>
              <Text size={1} textOverflow="ellipsis" weight="medium">
                {field.title}
              </Text>
            </Box>
            <span style={{...rampStyle, flex: 1}}>
              {COLOR_TINTS.map((tint) => (
                <span key={tint} style={{flex: 1, background: tints[tint].hex}} />
              ))}
            </span>
          </Flex>
        </Button>

        {expanded && (
          <Stack gap={3} paddingX={3}>
            <Text muted size={0}>
              {field.description}
            </Text>
            <ColorRow onChange={(mid) => onChange(field.key, {mid})} title="Mid" value={hue.mid} />
            <Flex align="center" gap={2}>
              <Stack flex={1} gap={2}>
                <Text size={1}>Mid point</Text>
                <Text muted size={0}>
                  The tint the mid color sits at
                </Text>
              </Stack>
              <Select
                aria-label={`${field.title} mid point`}
                fontSize={1}
                onChange={(event) => {
                  const value = Number(event.currentTarget.value)
                  const midPoint = MID_POINTS.find((candidate) => candidate === value)

                  if (midPoint !== undefined) {
                    onChange(field.key, {midPoint})
                  }
                }}
                padding={2}
                value={hue.midPoint}
              >
                {MID_POINTS.map((midPoint) => (
                  <option key={midPoint} value={midPoint}>
                    {midPoint}
                  </option>
                ))}
              </Select>
            </Flex>
            <ColorRow
              onChange={(lightest) => onChange(field.key, {lightest})}
              title="Lightest"
              value={hue.lightest}
            />
            <ColorRow
              onChange={(darkest) => onChange(field.key, {darkest})}
              title="Darkest"
              value={hue.darkest}
            />
          </Stack>
        )}
      </Stack>
    </Card>
  )
}

function ColorRow(props: {onChange: (value: string) => void; title: string; value: string}) {
  const {onChange, title, value} = props

  return (
    <Flex align="center" gap={2}>
      <Stack flex={1} gap={2}>
        <Text size={1}>{title}</Text>
        <Text muted size={0}>
          {value}
        </Text>
      </Stack>
      <Swatch
        aria-label={`${title} color`}
        onChange={(event) => onChange(event.currentTarget.value)}
        type="color"
        value={expandHex(value)}
      />
    </Flex>
  )
}
