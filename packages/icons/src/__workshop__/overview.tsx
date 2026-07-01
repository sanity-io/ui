import {Icon, SearchIcon, SpinnerIcon, type IconSymbol} from '@sanity/icons'
import {Box, Card, Code, Container, Flex, Heading, Stack, Text, TextInput} from '@sanity/ui'
import {startTransition, useEffect, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import tsx from 'refractor/typescript'
import {keyframes, styled} from 'styled-components'

import {useIconSearch} from './use-icon-search'

registerLanguage(tsx)

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinningIcon = styled(SpinnerIcon)`
  animation: ${rotate} 500ms linear infinite;
`

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function toPascalCase(str: string) {
  const p = str.split('-')

  return p.map(ucfirst).join('')
}

export default function OverviewStory() {
  const [query, setQuery] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('query') ?? ''
  })
  const {results: iconKeys, loading} = useIconSearch(query)

  useEffect(() => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(() => {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set('query', query)
        window.history.replaceState(null, '', `?${searchParams}`)
      })
      return () => cancelIdleCallback(id)
    }
    return undefined
  }, [query])

  return (
    <Card padding={[4, 5, 6]}>
      <Container width={1}>
        <Box marginBottom={4}>
          <TextInput
            icon={loading ? <SpinningIcon /> : SearchIcon}
            onChange={(event) => startTransition(() => setQuery(event.currentTarget.value))}
            placeholder="Search icons by name or meaning, e.g. “time” or “create person”…"
            radius={2}
            defaultValue={query}
          />
        </Box>

        {iconKeys.length === 0 && <Text>No matches</Text>}

        {iconKeys.length > 0 && (
          <Stack gap={3}>
            {iconKeys.map((key) => (
              <Card border key={key} overflow="hidden" radius={2}>
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
            ))}
          </Stack>
        )}
      </Container>
    </Card>
  )
}
