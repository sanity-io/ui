import {Icon, type IconSymbol} from '@sanity/icons'
// Preferred per-icon imports: pull in just the icons this view uses.
import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {CopyIcon} from '@sanity/icons/Copy'
import {ErrorOutlineIcon} from '@sanity/icons/ErrorOutline'
import {SearchIcon} from '@sanity/icons/Search'
import {SpinnerIcon} from '@sanity/icons/Spinner'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {ThListIcon} from '@sanity/icons/ThList'
import {
  Box,
  Button,
  Card,
  Code,
  Container,
  Flex,
  Heading,
  Popover,
  Stack,
  Text,
  TextInput,
} from '@sanity/ui'
import copy from 'copy-to-clipboard'
import {startTransition, useEffect, useState} from 'react'
import {registerLanguage} from 'react-refractor'
import tsx from 'refractor/typescript'
import {keyframes, styled} from 'styled-components'

import {GridView} from './grid-view'
import {getImportCode} from './icon-code'
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

const COPY_FEEDBACK_DURATION = 1500

type CopyState = 'idle' | 'copied' | 'error'

type ViewMode = 'list' | 'grid'

function ViewToggle({view, onChange}: {view: ViewMode; onChange: (view: ViewMode) => void}) {
  return (
    <Card border overflow="hidden" radius={2}>
      <Flex>
        <Button
          aria-label="List view"
          icon={ThListIcon}
          mode="bleed"
          onClick={() => onChange('list')}
          padding={3}
          radius={0}
          selected={view === 'list'}
        />
        <Card borderLeft />
        <Button
          aria-label="Grid view"
          icon={ThLargeIcon}
          mode="bleed"
          onClick={() => onChange('grid')}
          padding={3}
          radius={0}
          selected={view === 'grid'}
        />
      </Flex>
    </Card>
  )
}

function CopyCodeButton({code}: {code: string}) {
  const [state, setState] = useState<CopyState>('idle')
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (state === 'idle') return undefined

    const timeout = setTimeout(() => setState('idle'), COPY_FEEDBACK_DURATION)
    return () => clearTimeout(timeout)
  }, [state])

  function handleCopy() {
    // `copy-to-clipboard` uses the async Clipboard API when available and
    // transparently falls back to `execCommand`, so we don't have to.
    copy(code).then(
      (ok) => setState(ok ? 'copied' : 'error'),
      () => setState('error'),
    )
  }

  const icon = state === 'copied' ? CheckmarkIcon : state === 'error' ? ErrorOutlineIcon : CopyIcon
  const label = state === 'copied' ? 'Copied!' : state === 'error' ? 'Copy failed' : 'Copy code'
  const tone = state === 'copied' ? 'positive' : state === 'error' ? 'critical' : 'default'

  // A controlled Popover is used instead of <Tooltip> because Tooltip force
  // closes itself on click, so the "Copied!" confirmation would never show.
  // Here the label is always in sync: it appears on hover/focus and stays
  // open while the copied/error feedback is active.
  return (
    <Popover
      animate
      content={
        <Box padding={2}>
          <Text size={1}>{label}</Text>
        </Box>
      }
      open={hovered || state !== 'idle'}
      placement="bottom"
      portal
      radius={2}
      tone={tone}
    >
      <Button
        aria-label={label}
        icon={icon}
        mode="bleed"
        onBlur={() => setHovered(false)}
        onClick={handleCopy}
        onFocus={() => setHovered(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        padding={2}
        tone={tone}
      />
    </Popover>
  )
}

export default function OverviewStory() {
  const [query, setQuery] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('query') ?? ''
  })
  const [view, setView] = useState<ViewMode>(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('view') === 'grid' ? 'grid' : 'list'
  })
  const {results: iconKeys, loading} = useIconSearch(query)

  useEffect(() => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(() => {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set('query', query)
        searchParams.set('view', view)
        window.history.replaceState(null, '', `?${searchParams}`)
      })
      return () => cancelIdleCallback(id)
    }
    return undefined
  }, [query, view])

  return (
    <Card padding={[4, 5, 6]}>
      <Container width={1}>
        <Flex gap={2} marginBottom={4}>
          <Box flex={1}>
            <TextInput
              icon={loading ? <SpinningIcon /> : SearchIcon}
              onChange={(event) => startTransition(() => setQuery(event.currentTarget.value))}
              placeholder="Fuzzy search icons by name or meaning, e.g. “oh no” or “delete”…"
              radius={2}
              defaultValue={query}
            />
          </Box>
          <ViewToggle onChange={setView} view={view} />
        </Flex>

        {iconKeys.length === 0 && !loading && <Text>No matches</Text>}

        {iconKeys.length > 0 &&
          (view === 'grid' ? (
            <GridView iconKeys={iconKeys} />
          ) : (
            <Stack gap={3}>
              {iconKeys.map((key) => (
                <CodeSnippet key={key} icon={key} />
              ))}
            </Stack>
          ))}
      </Container>
    </Card>
  )
}

function CodeSnippet({icon}: {icon: string}) {
  const code = getImportCode(icon)

  return (
    <Card border overflow="hidden" radius={2}>
      <Flex align="center" gap={4} padding={4}>
        <Heading>
          <Icon symbol={icon as IconSymbol} />
        </Heading>
        <Text>{icon}</Text>
        <Box flex={1} />
        <CopyCodeButton code={code} />
      </Flex>
      <Card overflow="auto" padding={4} tone="transparent">
        <Code language="typescript">{code}</Code>
      </Card>
    </Card>
  )
}
