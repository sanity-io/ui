import {
  Box,
  Card,
  CodeSkeleton,
  Container,
  Flex,
  Grid,
  HeadingSkeleton,
  LabelSkeleton,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {getSpaceControls} from '../controls'

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  args: {animated: true},
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

export const WithDelay: Story = {
  parameters: {controls: {include: ['animated']}},
  render: (props) => {
    return (
      <Box padding={[4, 5, 6]}>
        <Container width={1}>
          <Text muted>Delayed by 1000ms</Text>
          <Card marginTop={4} padding={2} radius={2} border>
            <Flex align="center">
              <Skeleton
                {...props}
                style={{width: 90, height: 90}}
                radius={2}
                marginRight={3}
                delay={1000}
              />
              {/* oxlint-disable-next-line no-deprecated */}
              <Stack space={2} flex={1}>
                <HeadingSkeleton
                  {...props}
                  size={4}
                  style={{width: '100%'}}
                  radius={1}
                  delay={1000}
                />
                <TextSkeleton {...props} size={1} style={{width: '100%'}} radius={1} delay={1000} />
                <LabelSkeleton
                  {...props}
                  size={1}
                  style={{width: '100%'}}
                  radius={1}
                  delay={1000}
                />
                <CodeSkeleton {...props} size={1} style={{width: '100%'}} radius={1} delay={1000} />
              </Stack>
            </Flex>
          </Card>
        </Container>
      </Box>
    )
  },
}

export const CardSkeleton: Story = {
  render: (props) => {
    return (
      <Box padding={[4, 5, 6]}>
        <Container width={1}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack space={4}>
            {[1, 2, 3].map((item) => (
              <Card key={item} padding={2} radius={2} border>
                <Flex align="center">
                  {/* oxlint-disable-next-line no-deprecated */}
                  <Grid gap={2} columns={2} marginRight={3}>
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                  </Grid>
                  {/* oxlint-disable-next-line no-deprecated */}
                  <Stack space={2} flex={1}>
                    <HeadingSkeleton style={{width: '100%'}} radius={1} {...props} />
                    <TextSkeleton style={{width: '100%'}} radius={1} {...props} />
                    <LabelSkeleton style={{width: '100%'}} radius={1} {...props} />
                    <CodeSkeleton style={{width: '100%'}} radius={1} {...props} />
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
