import {LabelSkeleton, type LabelSkeletonProps, Skeleton} from '@sanity/ui'
import {FONT_LABEL_SIZE, type FontLabelSize} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {FONT_LABEL_SIZE_CONTROLS, SPACE_CONTROLS} from '../controls'
import {columnBuilder} from '../helpers/columnBuilder'

const meta: Meta<typeof LabelSkeleton> = {
  component: LabelSkeleton,
  argTypes: {
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    margin: SPACE_CONTROLS,
    marginBottom: SPACE_CONTROLS,
    marginLeft: SPACE_CONTROLS,
    marginRight: SPACE_CONTROLS,
    marginTop: SPACE_CONTROLS,
    marginY: SPACE_CONTROLS,
    marginX: SPACE_CONTROLS,
    size: FONT_LABEL_SIZE_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: (props) => <LabelSkeleton {...(props as LabelSkeletonProps)} />,
}

export const Sizes: Story = {
  parameters: {controls: {exclude: ['size']}},
  render: (props) => {
    return (
      <>
        {columnBuilder({
          gap: 4,
          renderItem: ({value, index}) => (
            <LabelSkeleton {...props} key={index} size={value as FontLabelSize} />
          ),
          rows: [...FONT_LABEL_SIZE],
        })}
      </>
    )
  },
}
