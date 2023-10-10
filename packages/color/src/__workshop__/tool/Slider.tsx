import {Code, Flex, Stack, TextInput, ThemeColorSpotKey, Tooltip} from '@sanity/ui'
import {ChangeEvent, ReactElement, useCallback, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {hexToRgb, hslToRgb, rgbToHex, rgbToHsl} from '../../lib/convert'
import {HSL} from '../../types'
import {SLIDER_H} from './constants'
import {useHandle} from './useHandle'

const Handle = styled.button<{$color: ThemeColorSpotKey}>`
  appearance: none;
  border: 0;
  position: absolute;
  background-color: ${({$color, theme}) => theme.sanity.color.spot[$color]};
  width: 12px;
  height: 12px;
  left: calc(50% - 6px);
  border-radius: 50%;
  margin: 0;
  padding: 0;

  &:focus {
    outline: ${({$color, theme}) => `2px solid ${theme.sanity.color.spot[$color]}`};
  }
`

export function HSLSlider(props: {onHSLChange: (hsl: HSL) => void; value: HSL}): ReactElement {
  const {onHSLChange, value} = props

  const hexValue = rgbToHex(hslToRgb(value))

  const wrapperRef = useRef<HTMLDivElement>(null)

  const {
    ref: hRef,
    top: hTop,
    value: h,
  } = useHandle({propValue: value[0], wrapperRef, min: 0, max: 360})

  const {
    ref: sRef,
    top: sTop,
    value: s,
  } = useHandle({propValue: value[1], wrapperRef, min: 0, max: 100})

  const {
    ref: lRef,
    top: lTop,
    value: l,
  } = useHandle({propValue: value[2], wrapperRef, min: 0, max: 100})

  useEffect(() => onHSLChange([h, s, l]), [h, s, l, onHSLChange])

  const handleHexChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const rgb = hexToRgb(event.currentTarget.value)

        onHSLChange(rgbToHsl(rgb))
      } catch (_) {
        //
      }
    },
    [onHSLChange],
  )

  return (
    <div style={{flex: 1}}>
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          height: SLIDER_H + 12,
        }}
      >
        <Tooltip content={<Code size={1}>H={h}</Code>} padding={2} placement="top" portal>
          <Handle $color="red" ref={hRef} style={{top: hTop}} />
        </Tooltip>
        <Tooltip content={<Code size={1}>S={s}</Code>} padding={2} placement="top" portal>
          <Handle $color="green" ref={sRef} style={{top: sTop}} />
        </Tooltip>
        <Tooltip content={<Code size={1}>L={l}</Code>} padding={2} placement="top" portal>
          <Handle $color="blue" ref={lRef} style={{top: lTop}} />
        </Tooltip>
      </div>

      <Stack padding={1} space={1} style={{borderTop: '1px solid var(--card-border-color)'}}>
        <Flex gap={1}>
          <TextInput fontSize={0} padding={1} readOnly value={h} />
          <TextInput fontSize={0} padding={1} readOnly value={s} />
          <TextInput fontSize={0} padding={1} readOnly value={l} />
        </Flex>
        <Flex gap={1}>
          <TextInput fontSize={0} onChange={handleHexChange} padding={1} value={hexValue} />
        </Flex>
      </Stack>
    </div>
  )
}
