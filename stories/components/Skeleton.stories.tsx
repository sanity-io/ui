import type {Meta, StoryObj} from '@storybook/react'
import {
  Skeleton,
  HeadingSkeleton,
  TextSkeleton,
  CodeSkeleton,
  LabelSkeleton,
} from '../../src/components'
import {Flex, Grid, Box, Container, Stack, Card} from '../../src/primitives'
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
    // tone: {
    //   control: {
    //     type: 'inline-radio',
    //     options: ['default', 'transparent', 'positive', 'caution', 'critical'],
    //   },
    //   defaultValue: 'default',
    // },
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
          <Stack space={4}>
            {[1, 2, 3].map((item) => (
              <Card key={item} padding={2} radius={2} border>
                {/* Want to show that the card can have tones */}
                <Flex align="center">
                  <Grid gap={2} columns={2} marginRight={3}>
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                    <Skeleton style={{width: 40, height: 40}} radius={2} {...props} />
                  </Grid>
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
