/* eslint-disable @typescript-eslint/no-empty-object-type */

import {Box, Card, Code} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {
  COLOR_VARIANTS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_SCHEMES,
  type ThemeColorCardToneKey,
  type ThemeColorSchemeKey,
  type ThemeColorVariantKey,
} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {useState} from 'react'

import {WORKSHOP_CARD_TONE_OPTIONS} from '../../../../../workshop'

interface ColorRecordNode extends Record<string, ColorNode> {}

type ColorNode = string | ColorRecordNode

export default function ColorStory() {
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS, 'default')

  return (
    <Card display="flex" flexDirection="column" gap={4} padding={4} tone={tone}>
      {Object.entries(vars.color).map(([key, value]) => {
        if (key === 'palette') {
          return null
        }

        if (THEME_COLOR_SCHEMES.includes(key as ThemeColorSchemeKey)) {
          return null
        }

        if (THEME_COLOR_CARD_TONES.includes(key as ThemeColorCardToneKey)) {
          return null
        }

        if (COLOR_VARIANTS.includes(key as ThemeColorVariantKey)) {
          // return null
        }

        return <ColorBox key={key} node={{key, value}} />
      })}
    </Card>
  )
}

function ColorBox({node}: {node: {key: string; value: ColorNode}}) {
  const {key, value} = node
  const [open, setOpen] = useState(true)

  if (typeof value === 'string') {
    return (
      <Box radius={2} padding={3} style={{backgroundColor: value}}>
        <Code size={1}>{key}</Code>
      </Box>
    )
  }

  return (
    <Box overflow="hidden" radius={3} shadow={1}>
      <Card as="button" onClick={() => setOpen(!open)} padding={3} tone="inherit">
        <Code size={1}>{`${key} +`}</Code>
      </Card>

      <Box display="flex" flexDirection="column" gap={3} hidden={!open} padding={3}>
        {Object.entries(value).map(([key, value]) => (
          <ColorBox key={key} node={{key, value}} />
        ))}
      </Box>
    </Box>
  )
}
