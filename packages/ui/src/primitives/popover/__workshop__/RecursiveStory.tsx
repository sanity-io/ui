import {Button, Flex, LayerProvider, type Placement, Popover, useLayer} from '@sanity/ui'
import {CARD_TONES} from '@sanity/ui/tokens'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

export default function RecursiveStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <LayerProvider>
        <RecursiveExample />
      </LayerProvider>
    </Flex>
  )
}

const placements: Placement[] = ['top', 'right', 'bottom', 'left']

function RecursiveExample({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {isTopLayer} = useLayer()
  const [toneSeed] = useState(() => Math.floor(Math.random() * CARD_TONES.length))
  const [placementSeed] = useState(() => Math.floor(Math.random() * placements.length))
  const fallbackPlacements = useMemo(() => {
    const before = placements.slice(placementSeed)
    const after = placements.slice(0, placementSeed)

    return before.concat(after)
  }, [placementSeed])

  useEffect(() => {
    if (open === false) buttonRef.current?.focus()
  }, [open])

  useEffect(() => {
    setTimeout(() => {
      buttonRef.current?.focus()
    }, 0)
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isTopLayer) return
      if (event.key === 'Escape' && onClose) onClose()
    },
    [isTopLayer, onClose],
  )

  return (
    <Popover
      content={<RecursiveExample onClose={handleClose} />}
      fallbackPlacements={fallbackPlacements}
      open={open}
      padding={1}
      placement={fallbackPlacements[3]}
      portal
      tone={CARD_TONES[toneSeed]}
    >
      <Button
        ref={buttonRef}
        // disabled={!isTopLayer}
        mode="bleed"
        text="Open"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
      />
    </Popover>
  )
}
