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
              <Card key={item} padding={2} radius={2} border>
                <Flex align="center">
                  <Grid gap={2} columns={2} marginRight={3}>
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                  </Grid>
                  <Stack gap={2} flex={1}>
                    <HeadingSkeleton
                      style={{width: '100%'}}
                      radius={1}
                      {...(props as HeadingSkeletonProps)}
                    />
                    <TextSkeleton
                      style={{width: '100%'}}
                      radius={1}
                      {...(props as TextSkeletonProps)}
                    />
                    <LabelSkeleton
                      style={{width: '100%'}}
                      radius={1}
                      {...(props as LabelSkeletonProps)}
                    />
                    <CodeSkeleton
                      style={{width: '100%'}}
                      radius={1}
                      {...(props as CodeSkeletonProps)}
                    />
                  </Stack>
                </Flex>
                <Flex marginTop={2}>
                  <Skeleton style={{height: 50}} flex={1} marginRight={1} radius={2} {...props} />
                  <Skeleton style={{height: 50}} flex={1} marginLeft={1} radius={2} {...props} />
                </Flex>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    )
  },
}
