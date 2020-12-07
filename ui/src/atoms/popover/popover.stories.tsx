import {Box, Button, Placement, Popover, Text} from '@sanity/ui'
import {boolean, withKnobs, select} from '@storybook/addon-knobs'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ThemeColorToneKey} from 'ui/src/theme'
import {LayerProvider, useLayer} from '../../utils'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Popover',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const open = boolean('Open', false, 'Props')

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    0,
    'Props'
  )

  const placement = select(
    'Placement',
    {
      Top: 'top',
      'Top start': 'top-start',
      'Top end': 'top-end',
      Right: 'right',
      'Right start': 'right-start',
      'Right end': 'right-end',
      Left: 'left',
      'Left start': 'left-start',
      'Left end': 'left-end',
      Bottom: 'bottom',
      'Bottom start': 'bottom-start',
      'Bottom end': 'bottom-end',
    },
    'bottom',
    'Props'
  )

  const radius = select(
    'Radius',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
    },
    0,
    'Props'
  )

  return (
    <Popover
      content={<Text>Popover content</Text>}
      open={open}
      padding={padding}
      placement={placement}
      radius={radius}
    >
      <Button text="Hello" />
    </Popover>
  )
}

export const recursive = () => {
  return (
    <LayerProvider>
      <RecursiveExample />
    </LayerProvider>
  )
}

const placements: Placement[] = ['top', 'right', 'bottom', 'left']
const tones: ThemeColorToneKey[] = ['primary', 'positive', 'caution', 'critical']

function RecursiveExample({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {isTopLayer} = useLayer()
  const [seed] = useState(() => Math.floor(Math.random() * 4))
  const fallbackPlacements = useMemo(() => {
    const before = placements.slice(seed)
    const after = placements.slice(0, seed)

    return before.concat(after)
  }, [seed])

  useEffect(() => {
    if (open === false) buttonRef.current?.focus()
  }, [open])

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isTopLayer) return
      if (event.key === 'Escape' && onClose) onClose()
    },
    [isTopLayer, onClose]
  )

  return (
    <Popover
      fallbackPlacements={fallbackPlacements}
      content={<RecursiveExample onClose={handleClose} />}
      open={open}
      placement={fallbackPlacements[3]}
      tone={tones[seed]}
    >
      <Box padding={1}>
        <Button
          mode="bleed"
          onKeyDown={handleKeyDown}
          onClick={handleOpen}
          ref={buttonRef}
          text="Open"
        />
      </Box>
    </Popover>
  )
}
