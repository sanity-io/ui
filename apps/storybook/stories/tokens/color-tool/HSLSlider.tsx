import {hexToRgb, HSL, hslToRgb, rgbToHex, rgbToHsl} from '@sanity/color'
import {Code, Flex, Stack, TextInput, Tooltip} from '@sanity/ui'
import {
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  useRef,
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

  const handleHexChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      onChange(rgbToHsl(hexToRgb(event.currentTarget.value)))
    } catch {
      // ignore incomplete hex values while typing
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
          <StyledTextInput fontSize={0} onChange={handleHexChange} padding={1} value={hexValue} />
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

  const handleMouseDown = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.focus()

    const valueFromPointer = (pointer: {clientY: number}): number | null => {
      const wrapper = wrapperRef.current

      if (!wrapper) return null

      const rect = wrapper.getBoundingClientRect()
      const nextTop = clamp(pointer.clientY - rect.top - 6, 0, SLIDER_H)

      return Math.round((nextTop / SLIDER_H) * max)
    }

    const initial = valueFromPointer(event)

    if (initial !== null) onChange(initial)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()

      const next = valueFromPointer(moveEvent)

      if (next !== null) onChange(next)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      onChange(clamp(value + 1, 0, max))
    }

    if (event.key === 'ArrowUp') {
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
        onMouseDown={handleMouseDown}
        style={{top}}
        type="button"
      />
    </Tooltip>
  )
}
