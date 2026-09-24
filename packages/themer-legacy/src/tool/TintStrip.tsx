import {COLOR_TINTS} from '@sanity/color'
import {Stack, Text} from '@sanity/ui'
import {useToast} from '@sanity/ui/toast'
import {Tooltip} from '@sanity/ui/tooltip'
import {useMemo} from 'react'
import {styled} from 'styled-components'

import {createTintsFromHue} from '../generator/createTonesFromHues'
import {Hue} from '../generator/types'

const Strip = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  height: 21px;
  border-radius: 3px;
  overflow: hidden;
  /* The gaps let the border color through between near-identical tints */
  gap: 1px;
  background: var(--card-border-color);
  box-shadow: inset 0 0 0 1px var(--card-border-color);
`

const Swatch = styled.button`
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--card-focus-ring-color);
    outline-offset: -2px;
  }
`

const Preview = styled.div`
  min-width: 52px;
  height: 28px;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px var(--card-border-color);
`

/**
 * The 50–950 tints a hue generates, as the hosted Themer showed them under
 * each hue: hover for the tint and its hex, click to copy the hex.
 */
export function TintStrip(props: {hue: Hue; title: string}) {
  const {hue, title} = props
  const toast = useToast()
  const tints = useMemo(() => createTintsFromHue(hue, title), [hue, title])

  const handleCopy = (hex: string, tintTitle: string) => {
    const reportFailure = () => {
      toast.push({status: 'error', title: `Could not copy ${tintTitle} to the clipboard`})
    }

    // The Clipboard API only exists in secure contexts, and reaching for
    // `writeText` without it throws instead of rejecting
    if (!navigator.clipboard) {
      reportFailure()
      return
    }

    // Confirm right away like the hosted Themer did: the clipboard promise can
    // stay pending behind a permission prompt, and the write itself is instant
    // once it goes through
    toast.push({closable: true, status: 'success', title: `Copied ${tintTitle} to the clipboard`})
    navigator.clipboard.writeText(hex).catch(reportFailure)
  }

  return (
    <Strip>
      {COLOR_TINTS.map((tint) => {
        const {hex, title: tintTitle} = tints[tint]

        return (
          <Tooltip
            content={
              <Stack gap={2}>
                <Preview style={{background: hex}} />
                <Text size={0} weight="medium">
                  {tint}
                </Text>
                <Text muted size={0}>
                  {hex}
                </Text>
              </Stack>
            }
            fallbackPlacements={['top-end', 'top-start']}
            key={tint}
            placement="top"
            portal
          >
            <Swatch
              aria-label={`Copy ${tintTitle} (${hex})`}
              onClick={() => handleCopy(hex, tintTitle)}
              style={{background: hex}}
              type="button"
            />
          </Tooltip>
        )
      })}
    </Strip>
  )
}
