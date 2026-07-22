import {Icon, type IconSymbol} from '@sanity/icons'
import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {ErrorOutlineIcon} from '@sanity/icons/ErrorOutline'
import {Card, Grid, Text, Tooltip} from '@sanity/ui'
import copy from 'copy-to-clipboard'
import {startTransition, useEffect, useState} from 'react'

import {getImportCode} from './icon-code'

const COPY_FEEDBACK_DURATION = 1500

const TILE_SIZE = '72px'

// Columns flex to fill the row (`1fr`), so tiles stretch to close any
// leftover width instead of leaving a gap on the right edge, while `gap`
// stays the single source of truth for spacing between both rows and
// columns. The tile's *height* is a fixed px value rather than derived from
// its (now variable) width via `aspect-ratio` — WebKit fails to recompute
// an aspect-ratio-derived row height after the viewport is resized
// (reproduced with Playwright: correct on fresh load, rows collapse
// together after a live resize). Since height never depends on width here,
// that recomputation never has to happen, sidestepping the bug. Tiles are
// no longer perfectly square when a row stretches, but the icon inside
// stays a fixed size and just gains more horizontal breathing room.
const GRID_STYLE = {gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_SIZE}, 1fr))`}

// `Card`'s `border` prop has no effect when `as="button"` (its button-reset
// CSS sets `border: 0`), so the border is drawn via inline style instead.
const TILE_STYLE = {
  height: TILE_SIZE,
  border: '1px solid var(--card-border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// `lineHeight: 0` collapses the icon's inline line box so its baseline
// whitespace doesn't push it off-center. Sized to match the icon in list view.
const ICON_STYLE = {fontSize: '33px', lineHeight: 0}

type CopyState = 'idle' | 'copied' | 'error'

export function GridView({iconKeys}: {iconKeys: string[]}) {
  return (
    <Grid gap={2} style={GRID_STYLE}>
      {iconKeys.map((key) => (
        <GridIconTile key={key} icon={key} />
      ))}
    </Grid>
  )
}

function GridIconTile({icon}: {icon: string}) {
  const [state, setState] = useState<CopyState>('idle')

  useEffect(() => {
    if (state === 'idle') return undefined

    const timeout = setTimeout(
      () => startTransition(() => setState('idle')),
      COPY_FEEDBACK_DURATION,
    )
    return () => clearTimeout(timeout)
  }, [state])

  function handleCopy() {
    copy(getImportCode(icon)).then(
      (ok) => startTransition(() => setState(ok ? 'copied' : 'error')),
      () => startTransition(() => setState('error')),
    )
  }

  const tone = state === 'copied' ? 'positive' : state === 'error' ? 'critical' : 'default'
  const iconElement =
    state === 'copied' ? (
      <CheckmarkIcon />
    ) : state === 'error' ? (
      <ErrorOutlineIcon />
    ) : (
      <Icon symbol={icon as IconSymbol} />
    )

  return (
    <Tooltip content={<TooltipLabel>{icon}</TooltipLabel>} placement="top" portal>
      <Card
        __unstable_focusRing
        aria-label={`Copy import for ${icon}`}
        as="button"
        onClick={handleCopy}
        padding={1}
        radius={2}
        style={TILE_STYLE}
        tone={tone}
      >
        <span style={ICON_STYLE}>{iconElement}</span>
      </Card>
    </Tooltip>
  )
}

function TooltipLabel({children}: {children: React.ReactNode}) {
  return (
    <Card padding={2} radius={2} tone="default">
      <Text size={1}>{children}</Text>
    </Card>
  )
}
