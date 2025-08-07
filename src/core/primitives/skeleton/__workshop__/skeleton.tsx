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
  TextSkeleton,
} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_CARD_TONE_OPTIONS} from '$workshop'

export default function SkeletonStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS)
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Stack gap={4}>
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              // @ts-expect-error - TODO: fix this
              tone={tone}
              padding={2}
              radius={2}
              border
            >
              <Flex align="center">
                <Grid gap={2} gridTemplateColumns={2} marginRight={3}>
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                </Grid>
                <Stack gap={2} flex={1}>
                  <HeadingSkeleton style={{width: '100%'}} radius={1} animated={animated} />
                  <TextSkeleton style={{width: '100%'}} radius={1} animated={animated} />
                  <LabelSkeleton style={{width: '100%'}} radius={1} animated={animated} />
                  <CodeSkeleton style={{width: '100%'}} radius={1} animated={animated} />
                </Stack>
              </Flex>
              <Flex marginTop={2}>
                <Skeleton
                  style={{height: 50}}
                  flex={1}
                  marginRight={1}
                  radius={2}
                  animated={animated}
                />
                <Skeleton
                  style={{height: 50}}
                  flex={1}
                  marginLeft={1}
                  radius={2}
                  animated={animated}
                />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
