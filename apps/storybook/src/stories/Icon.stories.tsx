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
import {TONE} from '../../../../packages/ui/src/types/Tone'
import {getArgTypes} from '../utils/getArgTypes'
import {iconProps} from '../../../../packages/ui/src/components/icon/icon.props'

const ICON_OPTIONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
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
    control: {type: 'select'},
    mapping: ICON_OPTIONS,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {type: 'select'},
  },
  tone: {
    options: TONE,
    control: {type: 'select'},
  },
}

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes,
  args: {
    icon: AddIcon,
    size: 'md',
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
      <Icon icon={icon} size="sm" />
      <Icon icon={icon} size="md" />
      <Icon icon={icon} size="lg" />
    </div>
  ),
}

export const Tones: Story = {
  render: ({icon}) => (
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <Icon icon={icon} tone="neutral" />
      <Icon icon={icon} tone="primary" />
      <Icon icon={icon} tone="positive" />
      <Icon icon={icon} tone="caution" />
      <Icon icon={icon} tone="critical" />
      <Icon icon={icon} tone="suggest" />
    </div>
  ),
}
