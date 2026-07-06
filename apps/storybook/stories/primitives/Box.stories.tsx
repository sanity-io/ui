import {Box, Flex, Grid, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {forwardRef} from 'react'

import {getSpaceControls} from '../controls'

const meta: Meta<typeof Box> = {
  args: {
    children: <Text>Box with a custom outline</Text>,
    padding: 4,
    style: {border: '1px solid red'},
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
  },
  component: Box,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: (props) => {
    return <Box {...props} />
  },
}

export const AsGridItem: Story = {
  args: {
    column: 2,
    children: <Text>Cell B</Text>,
  },
  argTypes: {
    column: {control: {type: 'number', min: 1, max: 12}},
    columnStart: {control: {type: 'number', min: 1, max: 12}},
    columnEnd: {control: {type: 'number', min: 1, max: 12}},
    row: {control: {type: 'number', min: 1, max: 12}},
    rowStart: {control: {type: 'number', min: 1, max: 12}},
    rowEnd: {control: {type: 'number', min: 1, max: 12}},
  },
  render: (props) => {
    return (
      <Grid columns={4} gap={2}>
        <Box padding={3} style={{border: '1px dashed #999'}}>
          <Text>Cell A</Text>
        </Box>
        <Box {...props} />
        <Box padding={3} style={{border: '1px dashed #999'}}>
          <Text>Cell C</Text>
        </Box>
      </Grid>
    )
  },
}

export const Responsive: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      <Box
        id="responsive-box"
        display={['none', 'block', 'none', 'block', 'none', 'block', 'none']}
        flex={[1, 2, 3, 4, 5, 6, 7]}
        padding={3}
        sizing={['content', 'border', 'content', 'border', 'content', 'border', 'content']}
        style={{outline: '1px solid var(--card-border-color)'}}
      >
        <Text align="center" muted>
          This is a box with responsive props
        </Text>
      </Box>
    </Box>
  ),
}

// A custom component with its own props. When passed to `Box`'s `as` prop, these props are
// inferred on `Box` itself: `href` is required and `target` is optional, and unknown props
// are rejected by the type checker.
const Link = forwardRef(function Link(
  props: {href: string; target?: string} & Omit<
    React.HTMLProps<HTMLAnchorElement>,
    'as' | 'href' | 'target'
  >,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): React.JSX.Element {
  const {children, ...restProps} = props

  return (
    <a {...restProps} ref={ref}>
      {children}
    </a>
  )
})

export const AsComponent: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <Box as={Link} href="/" padding={4} target="_new">
        <Text size={1}>As component</Text>
      </Box>
    </Flex>
  ),
}
