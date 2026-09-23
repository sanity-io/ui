import {COLOR_TINTS} from '@sanity/color'
import {Card, Grid, Stack, Text} from '@sanity/ui'
import {startTransition, useId, useState} from 'react'
import {styled} from 'styled-components'

import {Hue, Hues} from '../generator/types'
import {expandHex, roundMidPoint, stepMidPoint} from './hues'
import {TintStrip} from './TintStrip'

/**
 * `<input type="color">` paints the color into a shadow-DOM swatch that brings
 * its own border and padding, which then sits inside ours as a second border.
 * Stripping that chrome leaves the themed border as the only one.
 */
const ColorInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 33px;
  margin: 0;
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

/** A native range input, themed through `accent-color` */
const Range = styled.input`
  display: block;
  width: 100%;
  margin: 0;
  accent-color: var(--card-focus-ring-color);
`

const capitalize: React.CSSProperties = {textTransform: 'capitalize'}

interface HueFieldsProps {
  hue: Hue
  onChange: (tone: keyof Hues, hue: Hue) => void
  tone: keyof Hues
}

/**
 * The editor for one of the six hues, on a card in that hue's tone so the
 * card itself previews the result: the mid, lightest and darkest color
 * pickers, the mid-point slider that places `mid` on the ramp, and the
 * generated tints.
 *
 * The inputs keep their own state so dragging a picker or the slider stays
 * smooth, while the theme regenerates in a transition that React may
 * interrupt for the next drag event — regenerating the theme re-renders the
 * whole previewed Studio, twice in the split view.
 */
export function HueFields(props: HueFieldsProps) {
  const {hue, onChange, tone} = props
  const [draft, setDraft] = useState(hue)
  const [source, setSource] = useState(hue)
  // The mid-point slider moves in steps of 1 while the hue snaps to tints, so
  // the slider position is kept apart from the committed mid point
  const [midPointInput, setMidPointInput] = useState(String(hue.midPoint))
  const midRangeId = useId()
  const midRangeListId = useId()

  // Resync when the hue changes from outside (a preset was picked, or the
  // draft was reset) — a committed edit arrives here too, matching `draft`
  if (source !== hue) {
    setSource(hue)
    setDraft(hue)
    setMidPointInput(String(hue.midPoint))
  }

  const commit = (changes: Partial<Hue>) => {
    const next = {...draft, ...changes}

    setDraft(next)
    startTransition(() => onChange(tone, next))
  }

  const snapMidPoint = () => {
    const midPoint = roundMidPoint(Number(midPointInput))

    setMidPointInput(String(midPoint))
    if (midPoint !== draft.midPoint) commit({midPoint})
  }

  const handleMidPointKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const direction =
      event.key === 'ArrowLeft' || event.key === 'ArrowDown'
        ? -1
        : event.key === 'ArrowRight' || event.key === 'ArrowUp'
          ? 1
          : null

    if (direction === null) return

    event.preventDefault()

    const midPoint = stepMidPoint(roundMidPoint(Number(midPointInput)), direction)

    setMidPointInput(String(midPoint))
    if (midPoint !== draft.midPoint) commit({midPoint})
  }

  return (
    <Card border padding={3} radius={2} tone={tone}>
      <Stack gap={3}>
        <Text size={1} style={capitalize} weight="medium">
          {tone}
        </Text>

        <Grid gap={2} gridTemplateColumns={3}>
          <ColorField label="Mid" onChange={(mid) => commit({mid})} value={draft.mid} />
          <ColorField
            label="Lightest"
            onChange={(lightest) => commit({lightest})}
            value={draft.lightest}
          />
          <ColorField
            label="Darkest"
            onChange={(darkest) => commit({darkest})}
            value={draft.darkest}
          />
        </Grid>

        <Stack gap={2}>
          <label htmlFor={midRangeId}>
            <Text size={0} weight="medium">
              Mid point ({roundMidPoint(Number(midPointInput))})
            </Text>
          </label>
          <Range
            id={midRangeId}
            list={midRangeListId}
            max={950}
            min={50}
            onBlur={snapMidPoint}
            onChange={(event) => setMidPointInput(event.currentTarget.value)}
            onKeyDown={handleMidPointKeyDown}
            onPointerUp={snapMidPoint}
            step={1}
            type="range"
            value={midPointInput}
          />
          <datalist id={midRangeListId}>
            {COLOR_TINTS.map((tint) => (
              <option key={tint} value={tint}>
                {tint}
              </option>
            ))}
          </datalist>
        </Stack>

        <TintStrip hue={draft} title={tone} />
      </Stack>
    </Card>
  )
}

/** A color picker with its label above and its hex value below */
function ColorField(props: {label: string; onChange: (value: string) => void; value: string}) {
  const {label, onChange, value} = props
  const id = useId()

  return (
    <Stack gap={2}>
      <label htmlFor={id}>
        <Text size={0} weight="medium">
          {label}
        </Text>
      </label>
      <ColorInput
        id={id}
        onChange={(event) => onChange(event.currentTarget.value)}
        type="color"
        value={expandHex(value)}
      />
      <Text muted size={0} textOverflow="ellipsis">
        {value}
      </Text>
    </Stack>
  )
}
