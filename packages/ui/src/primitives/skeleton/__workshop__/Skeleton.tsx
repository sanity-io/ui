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
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS)
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Stack gap={4}>
          {[1, 2, 3].map((item) => (
            <Card key={item} border padding={2} radius={2} tone={tone}>
              <Flex align="center">
                <Grid gap={2} gridTemplateColumns={2} marginRight={3}>
                  <Skeleton animated={animated} radius={2} style={{width: 40, height: 40}} />
                  <Skeleton animated={animated} radius={2} style={{width: 40, height: 40}} />
                  <Skeleton animated={animated} radius={2} style={{width: 40, height: 40}} />
                  <Skeleton animated={animated} radius={2} style={{width: 40, height: 40}} />
                </Grid>
                <Stack flex={1} gap={2}>
                  <HeadingSkeleton animated={animated} radius={1} style={{width: '100%'}} />
                  <TextSkeleton animated={animated} radius={1} style={{width: '100%'}} />
                  <LabelSkeleton animated={animated} radius={1} style={{width: '100%'}} />
                  <CodeSkeleton animated={animated} radius={1} style={{width: '100%'}} />
                </Stack>
              </Flex>
              <Flex marginTop={2}>
                <Skeleton
                  animated={animated}
                  flex={1}
                  marginRight={1}
                  radius={2}
                  style={{height: 50}}
                />
                <Skeleton
                  animated={animated}
                  flex={1}
                  marginLeft={1}
                  radius={2}
                  style={{height: 50}}
                />
              </Flex>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
