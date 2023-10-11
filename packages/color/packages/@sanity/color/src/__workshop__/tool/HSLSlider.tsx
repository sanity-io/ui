import {Code, Flex, Stack, TextInput, ThemeColorSpotKey, Tooltip} from '@sanity/ui'
import {ChangeEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react'
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

const StyledTextInput = styled(TextInput)`
  /* max-width: 100%; */
  /* min-width: 0; */
  /* width: auto; */
  flex: 1;
`

export function HSLSlider(props: {
  onChange: (hsl: HSL) => void
  value: HSL
  onEnd?: () => void
  onStart?: () => void
}): ReactElement {
  const {onChange, onEnd, onStart, value} = props

  const hexValue = useMemo(() => rgbToHex(hslToRgb(value)), [value])

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [h, setH] = useState(() => value[0])
  const [s, setS] = useState(() => value[1])
  const [l, setL] = useState(() => value[2])

  const hRef = useRef(h)
  const sRef = useRef(s)
  const lRef = useRef(l)

  // const currentValue: HSL = useMemo(() => [h, s, l], [h, s, l])

  // useEffect(() => onChange(currentValue), [currentValue, onChange])

  const handleEnd = useCallback(() => {
    // onChange([hRef.current, sRef.current, lRef.current])
    onEnd?.()
  }, [])

  const handleHChange = useCallback((v: number) => {
    hRef.current = v
    setH(v)
    onChange([hRef.current, sRef.current, lRef.current])
  }, [])

  const handleSChange = useCallback((v: number) => {
    sRef.current = v
    setS(v)
    onChange([hRef.current, sRef.current, lRef.current])
  }, [])

  const handleLChange = useCallback((v: number) => {
    lRef.current = v
    setL(v)
    onChange([hRef.current, sRef.current, lRef.current])
  }, [])

  useEffect(() => {
    if (hRef.current !== value[0]) {
      hRef.current = value[0]
      setH(value[0])
    }
  }, [value[0]])

  useEffect(() => {
    if (sRef.current !== value[1]) {
      sRef.current = value[1]
      setS(value[1])
    }
  }, [value[0]])

  useEffect(() => {
    if (lRef.current !== value[2]) {
      lRef.current = value[2]
      setL(value[2])
    }
  }, [value[0]])

  const hHandle = useHandle({
    onChange: handleHChange,
    onEnd: handleEnd,
    onStart,
    propValue: value[0],
    wrapperRef,
    min: 0,
    max: 360,
  })

  const sHandle = useHandle({
    onChange: handleSChange,
    onEnd: handleEnd,
    onStart,
    propValue: value[1],
    wrapperRef,
    min: 0,
    max: 100,
  })

  const lHandle = useHandle({
    onChange: handleLChange,
    onEnd: handleEnd,
    onStart,
    propValue: value[2],
    wrapperRef,
    min: 0,
    max: 100,
  })

  const handleHexChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const rgb = hexToRgb(event.currentTarget.value)

        onChange(rgbToHsl(rgb))
      } catch (_) {
        //
      }
    },
    [onChange],
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
          <Handle $color="red" ref={hHandle.ref} style={{top: hHandle.top}} />
        </Tooltip>
        <Tooltip content={<Code size={1}>S={s}</Code>} padding={2} placement="top" portal>
          <Handle $color="green" ref={sHandle.ref} style={{top: sHandle.top}} />
        </Tooltip>
        <Tooltip content={<Code size={1}>L={l}</Code>} padding={2} placement="top" portal>
          <Handle $color="blue" ref={lHandle.ref} style={{top: lHandle.top}} />
        </Tooltip>
      </div>

      <Stack padding={1} space={1}>
        <Flex gap={1}>
          <StyledTextInput fontSize={0} padding={1} readOnly value={h} />
          <StyledTextInput fontSize={0} padding={1} readOnly value={s} />
          <StyledTextInput fontSize={0} padding={1} readOnly value={l} />
        </Flex>
        <Flex gap={1}>
          <StyledTextInput fontSize={0} onChange={handleHexChange} padding={1} value={hexValue} />
        </Flex>
      </Stack>
    </div>
  )
}
