import {
  Badge,
  Box,
  Button,
  Card,
  CodeSkeleton,
  Flex,
  Grid,
  Heading,
  HeadingSkeleton,
  LabelSkeleton,
  Menu,
  MenuButton,
  MenuItem,
  Skeleton,
  Stack,
  TextSkeleton,
  useToast,
} from '@sanity/ui'
import type {BadgeTone} from '@sanity/ui/css'
import {useState} from 'react'

export function AppRouter() {
  const toast = useToast()
  const [tone, setTone] = useState<BadgeTone>('suggest')

  return (
    <Card height="fill">
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        gap={[4, 5, 6, 7]}
        padding={[4, 5, 6, 7]}
      >
        <Badge
          radius={2}
          tone={tone}
          onClick={(event) => {
            event.preventDefault()
            setTone((tone) => {
              switch (tone) {
                case 'default':
                  return 'neutral'
                case 'neutral':
                  return 'primary'
                case 'primary':
                  return 'suggest'
                case 'suggest':
                  return 'positive'
                case 'positive':
                  return 'caution'
                case 'caution':
                  return 'critical'
                case 'critical':
                  return 'default'
              }
            })
          }}
        >
          Playground {tone}
        </Badge>

        <Card tone={tone} padding={2} radius={2} border>
          <Flex align={['center']}>
            <Grid gap={2} gridTemplateColumns={2} marginRight={3}>
              <Skeleton style={{width: 40, height: 40}} radius={2} animated />
              <Skeleton style={{width: 40, height: 40}} radius={2} animated />
              <Skeleton style={{width: 40, height: 40}} radius={2} animated />
              <Skeleton style={{width: 40, height: 40}} radius={2} animated />
            </Grid>
            <Stack gap={2} flex={1}>
              <HeadingSkeleton style={{width: '100%'}} radius={1} animated size={[2, 3, 4, 5]} />
              <TextSkeleton style={{width: '100%'}} radius={1} animated size={[2, 3, 4]} />
              <LabelSkeleton style={{width: '100%'}} radius={1} animated size={[2, 3, 4, 5]} />
              <CodeSkeleton style={{width: '100%'}} radius={1} animated size={[2, 3, 4]} />
            </Stack>
          </Flex>
          <Flex marginTop={2}>
            <Skeleton
              style={{height: 50}}
              // flex={1}
              marginRight={1}
              radius={2}
              animated
              flex={[1, 2, 3, 4]}
            />
            <Skeleton
              style={{height: 50}}
              flex={1}
              marginLeft={1}
              radius={[0, 1, 2, 3, 4, 5, 6, 7, 10]}
              animated
            />
          </Flex>
        </Card>

        <Heading as="h1" size={[2, 3, 4, 5]}>
          Sanity UI in Vite
        </Heading>

        <Button
          mode="ghost"
          onClick={() => toast.push({title: 'Hello, world'})}
          width="min"
          text="Push message to toast stack"
        />

        <MenuButton
          button={<Button mode="ghost" text="Open menu" width="min" />}
          id="test-menu-button"
          menu={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
              <MenuItem text="Item 3" />
            </Menu>
          }
        />
      </Box>
    </Card>
  )
}
