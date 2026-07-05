import {CodeSkeleton, Skeleton} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {getFontSizeControls, getSpaceControls} from '../controls'
import {columnBuilder} from '../helpers/columnBuilder'

const meta: Meta<typeof CodeSkeleton> = {
  component: CodeSkeleton,
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
    size: getFontSizeControls('code'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: (props) => <CodeSkeleton {...props} />,
}

export const Sizes: Story = {
  parameters: {controls: {exclude: ['size']}},
  render: (props) => {
    return (
      <>
        {columnBuilder({
          gap: 4,
          renderItem: ({value, index}) => <CodeSkeleton {...props} key={index} size={value} />,
          rows: [...Array(buildTheme().fonts.code.sizes.length).keys()],
        })}
      </>
    )
  },
}
