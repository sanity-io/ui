import {Icon, icons, type IconSymbol, SearchIcon, SpinnerIcon} from '@sanity/icons'
import {Box, Card, Code, Container, Flex, Heading, Stack, Text, TextInput} from '@sanity/ui'
import {useState, useTransition} from 'react'

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function toPascalCase(str: string) {
  const p = str.split('-')

  return p.map(ucfirst).join('')
}

export default function OverviewStory() {
  const [query, setQuery] = useState('')
  const [pending, startTransition] = useTransition()

  const _query = query.toLowerCase()
  const iconKeys = Object.keys(icons).filter((iconKey) => {
    return _query === ''
      ? true
      : iconKey.includes(query.toLowerCase()) ||
          // @ts-expect-error `displayName` is not typed
          icons[iconKey]?.displayName?.toLowerCase().includes(_query)
  })

  return (
    <Card padding={[4, 5, 6]}>
      <Container width={1}>
        <Box marginBottom={4}>
          <TextInput
            icon={
              pending ? (
                <SpinnerIcon
                  ref={(node) => {
                    const animation = node!.animate(
                      [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
                      {
                        duration: 500,
                        iterations: Infinity,
                        easing: 'linear',
                      },
                    )

                    return () => animation.cancel()
                  }}
                />
              ) : (
                SearchIcon
              )
            }
            onChange={(event) => {
              startTransition(() => setQuery(event.currentTarget.value))
            }}
            placeholder="Filter by name…"
            radius={2}
          />
        </Box>

        {iconKeys.length === 0 && <Text>No matches</Text>}

        {iconKeys.length > 0 && (
          <Stack space={3}>
            {iconKeys.map((iconKey) => (
              <Card border key={iconKey} overflow="hidden" radius={2}>
                <Flex align="center" gap={4} padding={4}>
                  <Heading>
                    <Icon symbol={iconKey as IconSymbol} />
                  </Heading>
                  <Text>{iconKey}</Text>
                </Flex>
                <Card overflow="auto" padding={4} tone="transparent">
                  <Code language="typescript">{`import {${toPascalCase(
                    iconKey,
                  )}Icon} from '@sanity/icons'`}</Code>
                </Card>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Card>
  )
}
