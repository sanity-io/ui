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

import {Icon} from '../../../../packages/ui/src/components/icon/Icon'
import {iconProps} from '../../../../packages/ui/src/components/icon/icon.props'
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
      context: '.sui-Icon',
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  render: (props) => <Icon {...props} />,
  play: async () => {
    const el = document.querySelector('[data-ui="Icon"]')
    await expect(el?.classList).toContain('sui-Icon')
  },
}

export const Sizes: Story = {
  render: ({icon}) => (
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <Icon icon={icon} size={0} />
      <Icon icon={icon} size={1} />
      <Icon icon={icon} size={2} />
      <Icon icon={icon} size={3} />
      <Icon icon={icon} size={4} />
      <Icon icon={icon} size={[1, 2, 3, 4]} />
    </div>
  ),
}

export const Tones: Story = {
  render: ({icon, muted}) => (
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <Icon icon={icon} tone="neutral" muted={muted} />
      <Icon icon={icon} tone="primary" muted={muted} />
      <Icon icon={icon} tone="positive" muted={muted} />
      <Icon icon={icon} tone="caution" muted={muted} />
      <Icon icon={icon} tone="critical" muted={muted} />
      <Icon icon={icon} tone="suggest" muted={muted} />
    </div>
  ),
}
