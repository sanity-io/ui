import {COLOR_TINTS} from '@sanity/color'
import {Card, Grid, Stack, Text} from '@sanity/ui'
import {useId, useState} from 'react'
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
  onChange: (tone: keyof Hues, changes: Partial<Hue>) => void
  tone: keyof Hues
}

/**
 * The editor for one of the six hues, on a card in that hue's tone so the
 * card itself previews the result: the mid, lightest and darkest color
 * pickers, the mid-point slider that places `mid` on the ramp, and the
 * generated tints.
 *
 * The inputs are controlled by the shared draft. Only the slider keeps local
 * state — its position moves in steps of 1 while the hue snaps to tints — and
 * it repositions when the hue's mid point changes to a tint other than the
 * one the slider is at (a preset, a reset), never while it is being dragged.
 */
export function HueFields(props: HueFieldsProps) {
  const {hue, onChange, tone} = props
  const [midPointInput, setMidPointInput] = useState(String(hue.midPoint))
  const [syncedMidPoint, setSyncedMidPoint] = useState(hue.midPoint)
  const midRangeId = useId()
  const midRangeListId = useId()

  if (syncedMidPoint !== hue.midPoint) {
    setSyncedMidPoint(hue.midPoint)
    if (roundMidPoint(Number(midPointInput)) !== hue.midPoint) {
      setMidPointInput(String(hue.midPoint))
    }
  }

  const commitMidPoint = (value: string) => {
    const midPoint = roundMidPoint(Number(value))

    setMidPointInput(value)
    if (midPoint !== hue.midPoint) onChange(tone, {midPoint})
  }

  const snapMidPoint = () => {
    setMidPointInput(String(roundMidPoint(Number(midPointInput))))
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
    commitMidPoint(String(stepMidPoint(roundMidPoint(Number(midPointInput)), direction)))
  }

  return (
    <Card border padding={3} radius={2} tone={tone}>
      <Stack gap={3}>
        <Text size={1} style={capitalize} weight="medium">
          {tone}
        </Text>

        <Grid gap={2} gridTemplateColumns={3}>
          <ColorField label="Mid" onChange={(mid) => onChange(tone, {mid})} value={hue.mid} />
          <ColorField
            label="Lightest"
            onChange={(lightest) => onChange(tone, {lightest})}
            value={hue.lightest}
          />
          <ColorField
            label="Darkest"
            onChange={(darkest) => onChange(tone, {darkest})}
            value={hue.darkest}
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
            onChange={(event) => commitMidPoint(event.currentTarget.value)}
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

        <TintStrip hue={hue} title={tone} />
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
