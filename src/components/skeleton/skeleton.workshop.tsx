import {
  Box,
  Card,
  Text,
  Container,
  Skeleton,
  TextSkeleton,
  CodeSkeleton,
  HeadingSkeleton,
  LabelSkeleton,
  Stack,
  Flex,
  ThemeColorToneKey,
  Grid,
} from '@sanity/ui'
import {defineScope, useSelect, useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('components/skeleton', 'Skeleton', [
  {name: 'skeleton', title: 'Skeleton', component: SkeletonStory},
  {name: 'skeleton-delay', title: 'Skeleton delay', component: SkeletonDelayStory},
])

const TONE_OPTIONS: {[key: string]: ThemeColorToneKey} = {
  Default: 'default',
  Transparent: 'transparent',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

function SkeletonStory() {
  const tone = useSelect('Tone', TONE_OPTIONS, '', 'Props') || 'default'
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Stack space={4}>
          {[1, 2, 3].map((item) => (
            <Card key={item} tone={tone} padding={2} radius={2} border>
              <Flex align="center">
                <Grid gap={2} columns={2} marginRight={3}>
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                  <Skeleton style={{width: 40, height: 40}} radius={2} animated={animated} />
                </Grid>
                <Stack space={2} flex={1}>
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

function SkeletonDelayStory() {
  const tone = useSelect('Tone', TONE_OPTIONS, '', 'Props') || 'default'
  const animated = useBoolean('Animated', true)

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Text muted>Delayed by 2000ms</Text>
        <Card tone={tone} marginTop={4} padding={2} radius={2} border>
          <Flex align="center">
            <Skeleton
              style={{width: 90, height: 90}}
              radius={2}
              animated={animated}
              marginRight={3}
              delay={1000}
            />
            <Stack space={2} flex={1}>
              <HeadingSkeleton
                size={4}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <TextSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <LabelSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
              <CodeSkeleton
                size={1}
                style={{width: '100%'}}
                radius={1}
                animated={animated}
                delay={1000}
              />
            </Stack>
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}
