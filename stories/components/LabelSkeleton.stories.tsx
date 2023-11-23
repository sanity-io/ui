import type {Meta, StoryObj} from '@storybook/react'
import {LabelSkeleton, Skeleton} from '../../src/core/components'
import {fonts} from '../../src/theme/studioTheme/fonts'
import {getFontSizeControls, getSpaceControls} from '../controls'
import {columnBuilder} from '../helpers/columnBuilder'

const meta: Meta<typeof LabelSkeleton> = {
  component: LabelSkeleton,
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingX: getSpaceControls(),
    margin: getSpaceControls(),
    marginBottom: getSpaceControls(),
    marginLeft: getSpaceControls(),
    marginRight: getSpaceControls(),
    marginTop: getSpaceControls(),
    marginY: getSpaceControls(),
    marginX: getSpaceControls(),
    size: getFontSizeControls('label'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: (props) => <LabelSkeleton {...props} />,
}

export const Sizes: Story = {
  parameters: {controls: {exclude: ['size']}},
  render: (props) => {
    return (
      <>
        {columnBuilder({
          gap: 4,
          renderItem: ({value, index}) => <LabelSkeleton {...props} key={index} size={value} />,
          rows: [...Array(fonts['code'].sizes.length).keys()],
        })}
      </>
    )
  },
}
