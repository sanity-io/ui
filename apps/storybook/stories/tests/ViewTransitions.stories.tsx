import type {Meta, StoryObj} from '@storybook/react-vite'

import {VIEW_TRANSITION_SCENARIOS, ViewTransitions} from './ViewTransitions'

/**
 * A render rig for React's
 * [`<ViewTransition>`](https://react.dev/reference/react/ViewTransition): every Sanity UI
 * component sits in its own boundary, and **Mount** and **Move** update them in a
 * `startTransition` with slowed-down animations. A component that forces a synchronous render
 * while a transition is preparing makes React skip the animation, which the log lists together
 * with the call stack that cancelled it.
 */
const meta: Meta<typeof ViewTransitions> = {
  args: {duration: 3000},
  argTypes: {
    duration: {control: {type: 'range', min: 100, max: 10_000, step: 100}},
    scenarios: {
      control: 'multi-select',
      options: VIEW_TRANSITION_SCENARIOS.map((scenario) => scenario.id),
    },
  },
  component: ViewTransitions,
  parameters: {padding: 0},
}

export default meta
type Story = StoryObj<typeof ViewTransitions>

export const Default: Story = {}

export const Overlays: Story = {
  args: {
    scenarios: [
      'tooltip',
      'tooltip-animated-portal',
      'tooltip-delay-group',
      'popover',
      'popover-animated-portal',
      'popover-constrain-size',
      'boundary-element',
      'menu',
      'menu-button',
      'autocomplete',
      'dialog',
    ],
  },
}
