import {
  Box,
  Card,
  CARD_TONES,
  CodeSkeleton,
  Container,
  Flex,
  HeadingSkeleton,
  LabelSkeleton,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

export default function SkeletonDelayStory(): React.JSX.Element {
  const tone = useSelect('Tone', CARD_TONES)
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Text muted>Delayed by 2000ms</Text>
        <Card border marginTop={4} padding={2} radius={2} tone={tone}>
          <Flex align="center">
            <Skeleton
              animated={animated}
              delay={1000}
              marginRight={3}
              radius={2}
              style={{width: 90, height: 90}}
            />
            <Stack flex={1} gap={2}>
              <HeadingSkeleton
                animated={animated}
                delay={1000}
                radius={1}
                size={4}
                style={{width: '100%'}}
              />
              <TextSkeleton
                animated={animated}
                delay={1000}
                radius={1}
                size={1}
                style={{width: '100%'}}
              />
              <LabelSkeleton
                animated={animated}
                delay={1000}
                radius={1}
                size={1}
                style={{width: '100%'}}
              />
              <CodeSkeleton
                animated={animated}
                delay={1000}
                radius={1}
                size={1}
                style={{width: '100%'}}
              />
            </Stack>
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}
