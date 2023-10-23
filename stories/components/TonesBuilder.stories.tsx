/* eslint-disable @typescript-eslint/ban-ts-comment */
import {ColorTint} from '@sanity/color'
import type {Meta, StoryObj} from '@storybook/react'
//@ts-ignore
import {theme as defaultTheme} from 'https://themer.sanity.build/api/hues'
//@ts-ignore
import {theme as retroColonial} from 'https://themer.sanity.build/api/hues?preset=retro-colonial'
//@ts-ignore
import {theme as twCyan} from 'https://themer.sanity.build/api/hues?preset=tw-cyan'
//@ts-ignore
import {theme as verdant} from 'https://themer.sanity.build/api/hues?preset=verdant'
import {Flex, Text} from '../../src/primitives'
import {cssVars} from '../../src/theme'
import {createTonesWithLegacyColor} from '../../src/theme/lib/theme/color/_legacy/createTints'

import {
  legacyStudioTheme,
  legacyVercelTheme as vercelTheme,
} from '../../src/theme/lib/theme/color/_legacy/legacyTheme'

const themes = {
  legacyStudioTheme: legacyStudioTheme,
  default: defaultTheme,
  retroColonial: retroColonial,
  twCyan: twCyan,
  verdant: verdant,
  vercel: vercelTheme,
} as const

const DisplayColorTint = ({tint}: {tint: ColorTint}) => (
  <Flex
    key={tint.hex}
    justify={'flex-start'}
    gap={3}
    padding={3}
    align={'center'}
    style={{border: `1px solid ${cssVars.default['border-base']}`, borderRadius: '8px'}}
  >
    <div
      style={{
        flexShrink: 0,
        height: '48px',
        width: '48px',
        borderRadius: '4px',
        boxShadow: `0 0 0 1px ${cssVars.default['border-base']}`,
        backgroundColor: tint.hex,
      }}
    />
    <Flex gap={2} direction={'column'} height={'fill'} justify={'center'} align="flex-start">
      <Flex>
        <Text size={1} weight="medium" style={{textTransform: 'capitalize'}}>
          {tint.title}
        </Text>
      </Flex>
      <Text size={0} muted>
        {tint.hex}
      </Text>
    </Flex>
  </Flex>
)

const TonesGenerator = ({themeName}: {themeName: keyof typeof themes}): React.ReactNode => {
  const theme = themes[themeName]
  const tones = createTonesWithLegacyColor(theme.color)

  return (
    <Flex gap={4}>
      {Object.entries(tones).map(([key, tone]) => (
        <Flex direction={'column'} gap={2} align="flex-start" key={key}>
          <Text>{key}</Text>
          {Object.values(tone).map((tint) => (
            <DisplayColorTint tint={tint} key={tint.hex} />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

const meta: Meta<typeof TonesGenerator> = {
  args: {themeName: 'legacyStudioTheme'},
  argTypes: {
    themeName: {
      control: {
        type: 'select',
      },
      options: Object.keys(themes),
    },
  },
  component: TonesGenerator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TonesGenerator>

export const Default: Story = {
  render: (props) => {
    return <TonesGenerator {...props} />
  },
}
