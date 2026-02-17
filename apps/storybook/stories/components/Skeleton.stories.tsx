import {
  Box,
  Card,
  CodeSkeleton,
  type CodeSkeletonProps,
  Container,
  Flex,
  Grid,
  HeadingSkeleton,
  type HeadingSkeletonProps,
  LabelSkeleton,
  type LabelSkeletonProps,
  Skeleton,
  Stack,
  TextSkeleton,
  type TextSkeletonProps,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  args: {animated: true},
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
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    style: {width: 200, height: 40},
  },
  render: (props) => <Skeleton {...props} />,
}

export const CardSkeleton: Story = {
  render: (props) => {
    return (
      <Box padding={[4, 5, 6]}>
        <Container width={1}>
          <Stack gap={4}>
            {[1, 2, 3].map((item) => (
              <Card key={item} border padding={2} radius={2}>
                <Flex align="center">
                  <Grid columns={2} gap={2} marginRight={3}>
                    <Skeleton radius={2} style={{width: 40, height: 40}} {...props} />
                    <Skeleton radius={2} style={{width: 40, height: 40}} {...props} />
                    <Skeleton radius={2} style={{width: 40, height: 40}} {...props} />
                    <Skeleton radius={2} style={{width: 40, height: 40}} {...props} />
                  </Grid>
                  <Stack flex={1} gap={2}>
                    <HeadingSkeleton
                      radius={1}
                      style={{width: '100%'}}
                      {...(props as HeadingSkeletonProps)}
                    />
                    <TextSkeleton
                      radius={1}
                      style={{width: '100%'}}
                      {...(props as TextSkeletonProps)}
                    />
                    <LabelSkeleton
                      radius={1}
                      style={{width: '100%'}}
                      {...(props as LabelSkeletonProps)}
                    />
                    <CodeSkeleton
                      radius={1}
                      style={{width: '100%'}}
                      {...(props as CodeSkeletonProps)}
                    />
                  </Stack>
                </Flex>
                <Flex marginTop={2}>
                  <Skeleton flex={1} marginRight={1} radius={2} style={{height: 50}} {...props} />
                  <Skeleton flex={1} marginLeft={1} radius={2} style={{height: 50}} {...props} />
                </Flex>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    )
  },
}
