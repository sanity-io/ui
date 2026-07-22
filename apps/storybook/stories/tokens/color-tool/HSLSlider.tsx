import {hexToRgb, HSL, hslToRgb, rgbToHex, rgbToHsl} from '@sanity/color'
import {Code, Flex, Stack, TextInput, Tooltip} from '@sanity/ui'
import {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react'
import {styled} from 'styled-components'

import {CHANNEL_COLORS, SLIDER_H} from './constants'

const Handle = styled.button<{$color: string}>`
  appearance: none;
  border: 0;
  position: absolute;
  background-color: ${({$color}) => $color};
  width: 12px;
  height: 12px;
  left: calc(50% - 6px);
  border-radius: 50%;
  margin: 0;
  padding: 0;
  /* The handle is dragged with pointer events; don't let touch scroll instead */
  touch-action: none;

  &:focus {
    outline: ${({$color}) => `2px solid ${$color}`};
  }
`

const StyledTextInput = styled(TextInput)`
  flex: 1;
`

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** Vertical slider with draggable handles for each HSL channel + a hex input */
export function HSLSlider(props: {onChange: (hsl: HSL) => void; value: HSL}): ReactNode {
  const {onChange, value} = props
  const [h, s, l] = value
  const hexValue = rgbToHex(hslToRgb(value))
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // While the hex input is focused, show what the user typed (the canonical
  // hex would otherwise reset the field on every keystroke that doesn't parse)
  const [hexDraft, setHexDraft] = useState<string | null>(null)

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const draft = event.currentTarget.value

    setHexDraft(draft)

    try {
      onChange(rgbToHsl(hexToRgb(draft)))
    } catch {
      // incomplete hex value; keep the draft until it parses
    }
  }

  return (
    <div style={{flex: 1}}>
      <div ref={wrapperRef} style={{position: 'relative', height: SLIDER_H + 12}}>
        <SliderHandle
          color={CHANNEL_COLORS.h}
          label={`H=${h}`}
          max={360}
          onChange={(next) => onChange([next, s, l])}
          value={h}
          wrapperRef={wrapperRef}
        />
        <SliderHandle
          color={CHANNEL_COLORS.s}
          label={`S=${s}`}
          max={100}
          onChange={(next) => onChange([h, next, l])}
          value={s}
          wrapperRef={wrapperRef}
        />
        <SliderHandle
          color={CHANNEL_COLORS.l}
          label={`L=${l}`}
          max={100}
          onChange={(next) => onChange([h, s, next])}
          value={l}
          wrapperRef={wrapperRef}
        />
      </div>

      <Stack gap={1} padding={1}>
        <Flex gap={1}>
          <StyledTextInput fontSize={0} padding={1} readOnly value={String(h)} />
          <StyledTextInput fontSize={0} padding={1} readOnly value={String(s)} />
          <StyledTextInput fontSize={0} padding={1} readOnly value={String(l)} />
        </Flex>
        <Flex gap={1}>
          <StyledTextInput
            fontSize={0}
            onBlur={() => setHexDraft(null)}
            onChange={handleHexChange}
            onFocus={(event) => setHexDraft(event.currentTarget.value)}
            padding={1}
            value={hexDraft ?? hexValue}
          />
        </Flex>
      </Stack>
    </div>
  )
}

/**
 * A draggable channel handle. Fully controlled: its vertical position derives
 * from `value`, and dragging (or the arrow keys) reports the next value
 * through `onChange`.
 */
function SliderHandle(props: {
  color: string
  label: string
  max: number
  onChange: (value: number) => void
  value: number
  wrapperRef: RefObject<HTMLDivElement | null>
}) {
  const {color, label, max, onChange, value, wrapperRef} = props
  const top = (value / max) * SLIDER_H

  const valueFromPointer = (pointer: {clientY: number}): number | null => {
    const wrapper = wrapperRef.current

    if (!wrapper) return null

    const rect = wrapper.getBoundingClientRect()
    const nextTop = clamp(pointer.clientY - rect.top - 6, 0, SLIDER_H)

    return Math.round((nextTop / SLIDER_H) * max)
  }

  // Drag with pointer capture: move/up events keep arriving on the handle
  // even when the pointer leaves the iframe/window, and the capture is
  // implicitly released on pointerup/pointercancel — so a drag can never
  // get stuck (no window listeners to leak)
  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.focus()
    event.currentTarget.setPointerCapture(event.pointerId)

    const next = valueFromPointer(event)

    if (next !== null) onChange(next)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return

    event.preventDefault()

    const next = valueFromPointer(event)

    if (next !== null) onChange(next)
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    // Arrow keys follow the value (up = increase), like a native slider,
    // even though larger values sit lower in this layout
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      onChange(clamp(value + 1, 0, max))
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      onChange(clamp(value - 1, 0, max))
    }
  }

  return (
    <Tooltip content={<Code size={1}>{label}</Code>} padding={2} placement="top" portal>
      <Handle
        $color={color}
        aria-label={label}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{top}}
        type="button"
      />
    </Tooltip>
  )
}
