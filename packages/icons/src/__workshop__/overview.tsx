import {Icon, icons, SearchIcon, type IconSymbol} from '@sanity/icons'
import {Box, Card, Code, Container, Flex, Heading, Stack, Text, TextInput} from '@sanity/ui'
import {useState, Activity, startTransition} from 'react'
import {registerLanguage} from 'react-refractor'
import tsx from 'refractor/typescript'

registerLanguage(tsx)

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function toPascalCase(str: string) {
  const p = str.split('-')

  return p.map(ucfirst).join('')
}

export default function OverviewStory() {
  const [_query, setQuery] = useState('')

  const query = _query.toLowerCase()
  const filteredKeys = Object.keys(icons).filter((iconKey) => {
    return _query === ''
      ? true
      : iconKey.includes(query) ||
          // @ts-expect-error `displayName` is not typed
          icons[iconKey]?.displayName?.toLowerCase().includes(query)
  })

  return (
    <Card padding={[4, 5, 6]}>
      <Container width={1}>
        <Box marginBottom={4}>
          <TextInput
            icon={SearchIcon}
            onChange={(event) => startTransition(() => setQuery(event.currentTarget.value))}
            placeholder="Filter by name…"
            radius={2}
          />
        </Box>

        <Activity mode={filteredKeys.length ? 'hidden' : 'visible'}>
          <Text>No matches</Text>
        </Activity>

        <Stack space={3}>
          {Object.keys(icons).map((key) => (
            <Activity key={key} mode={filteredKeys.includes(key) ? 'visible' : 'hidden'}>
              <Card border overflow="hidden" radius={2}>
                <Flex align="center" gap={4} padding={4}>
                  <Heading>
                    <Icon symbol={key as IconSymbol} />
                  </Heading>
                  <Text>{key}</Text>
                </Flex>
                <Card overflow="auto" padding={4} tone="transparent">
                  <Code language="typescript">{`import {${toPascalCase(
                    key,
                  )}Icon} from '@sanity/icons'`}</Code>
                </Card>
              </Card>
            </Activity>
          ))}
        </Stack>
      </Container>
    </Card>
  )
}
