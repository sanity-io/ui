import {FontHeadingSize} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {HeadingSkeleton, HeadingSkeletonProps, Skeleton} from '../../src/core/components'
import {defaultThemeFonts} from '../../src/theme/defaults/fonts'
import {getFontSizeControls, getSpaceControls} from '../controls'
import {columnBuilder} from '../helpers/columnBuilder'

const meta: Meta<typeof HeadingSkeleton> = {
  component: HeadingSkeleton,
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
    size: getFontSizeControls('heading'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: (props) => <HeadingSkeleton {...(props as HeadingSkeletonProps)} />,
}

export const Sizes: Story = {
  parameters: {controls: {exclude: ['size']}},
  render: (props) => {
    return (
      <>
        {columnBuilder({
          gap: 4,
          renderItem: ({value, index}) => (
            <HeadingSkeleton {...props} key={index} size={value as FontHeadingSize} />
          ),
          rows: [...Array(defaultThemeFonts['code'].sizes.length).keys()],
        })}
      </>
    )
  },
}
