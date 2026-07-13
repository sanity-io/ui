import {
  AddIcon,
  CheckmarkIcon,
  CloseIcon,
  EditIcon,
  SearchIcon,
  WarningOutlineIcon,
} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {iconProps} from '../../../../packages/ui/src/components/icon/icon.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {ICON_SIZE} from '../../../../packages/ui/src/types/Icon'
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'

const ICON_OPTIONS = {
  AddIcon,
  CheckmarkIcon,
  CloseIcon,
  EditIcon,
  SearchIcon,
  WarningOutlineIcon,
}

const argTypes = {
  ...getArgTypes(iconProps),
  icon: {
    options: Object.keys(ICON_OPTIONS),
    control: {type: 'select'} as const,
    mapping: ICON_OPTIONS,
  },
}

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes,
  args: {
    icon: AddIcon,
  },
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Icon"]',
    },
    performance: {
      component: Icon,
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  render: (props) => <Icon {...props} aria-label="Icon" />,
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Icon')).dataset.ui).toBe('Icon')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {ICON_SIZE.map((size) => (
          <Flex key={size} alignItems="center">
            <Icon {...props} size={size} aria-label={`Icon Size ${size}`} />
            <Text size={size}>({['17px', '21px', '25px', '29px', '33px'][size]})</Text>
          </Flex>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Icon Size 3')).classList).toContain(
      'sui-icon-body3',
    )
  },
}

export const Tones: Story = {
  render: (props) => {
    return (
      <Flex alignItems="center" gap={4}>
        {TONE.map((tone) => (
          <Icon
            {...props}
            key={tone}
            tone={tone}
            aria-label={`Icon Tone ${tone[0].toUpperCase() + tone.slice(1)}`}
          />
        ))}
      </Flex>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByLabelText('Icon Tone Positive')).classList).toContain(
      'sui-tone-positive',
    )
  },
}
