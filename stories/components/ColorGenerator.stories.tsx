import {ColorTint} from '@sanity/color'
import type {Meta, StoryObj} from '@storybook/react'
import {useMemo} from 'react'
import {Flex, Text} from '../../src/primitives'
import {ThemeColorToneKey, cssVars} from '../../src/theme'
import {createLegacyTints} from '../../src/theme/lib/theme/color/_legacy/createTints'

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

interface ColorGeneratorProps {
  hex: string
  midPoint: number
  tone: ThemeColorToneKey
}

const ColorGenerator = ({hex, midPoint, tone}: ColorGeneratorProps): React.ReactNode => {
  const tints = useMemo(() => createLegacyTints({hex, midPoint, tone}), [hex, midPoint, tone])

  return (
    <Flex direction={'column'} gap={2} align="flex-start">
      {Object.values(tints).map((tint) => (
        <DisplayColorTint tint={tint} key={tint.hex} />
      ))}
    </Flex>
  )
}

const meta: Meta<typeof ColorGenerator> = {
  args: {
    midPoint: 500,
    hex: '#2276fc',
    tone: 'primary',
  },
  component: ColorGenerator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ColorGenerator>

export const Default: Story = {
  render: (props) => {
    return <ColorGenerator {...props} />
  },
}
