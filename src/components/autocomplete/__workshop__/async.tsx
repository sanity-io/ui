import {LinkIcon} from '@sanity/icons'
import {
  Autocomplete,
  BaseAutocompleteOption,
  Box,
  Button,
  Card,
  Code,
  LayerProvider,
  Stack,
  Text,
} from '@sanity/ui'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import countries from '../__fixtures__/countries'

export default function AsyncStory() {
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const [value, setValue] = useState('')
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const fetchCurrentRef = useRef<{cancel: () => void} | null>(null)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)

  const doSearch = useCallback((query: string | null) => {
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      if (query !== null) {
        doSearch(query)
      }
    },
    [doSearch]
  )

  const handleOpenButtonClick = useCallback(() => {
    if (!value) {
      doSearch('')
    }
  }, [doSearch, value])

  const renderValue = useCallback(() => {
    if (loadingCurrentRef) {
      return 'Loading…'
    }

    return optionTitle || ''
  }, [loadingCurrentRef, optionTitle])

  const renderOption = useCallback((option: BaseAutocompleteOption) => {
    return <AsyncOption documentId={option.value} />
  }, [])

  useEffect(() => {
    if (fetchCurrentRef.current) fetchCurrentRef.current.cancel()

    if (value) {
      fetchCurrentRef.current = fetchDocument(
        value,
        (data) => setOptionTitle(data?.title || null),
        setLoadingCurrentRef
      )
    } else {
      setOptionTitle(null)
      setLoadingCurrentRef(false)
    }
  }, [value])

  useEffect(() => {
    if (optionTitle) doSearch(optionTitle)
  }, [doSearch, optionTitle])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Text as="label" htmlFor="async" size={1} weight="semibold">
          Country
        </Text>
        <LayerProvider zOffset={100}>
          <Autocomplete
            disabled={loadingCurrentRef}
            filterOption={filterOption}
            id="async"
            loading={loading}
            onChange={setValue}
            onQueryChange={handleQueryChange}
            openButton={{onClick: handleOpenButtonClick}}
            options={options}
            placeholder="Search..."
            prefix={
              <Box padding={1}>
                <Button disabled={!value} icon={LinkIcon} mode="bleed" padding={2} />
              </Box>
            }
            radius={1}
            renderOption={renderOption}
            renderValue={renderValue}
            value={value}
          />
        </LayerProvider>

        <Card border overflow="auto" padding={3} radius={1}>
          <Code language="json">{JSON.stringify({loading, options, value}, null, 2)}</Code>
        </Card>
      </Stack>
    </Box>
  )
}

function AsyncOption(props: {documentId: string; disabled?: boolean; tabIndex?: number}) {
  const {documentId, disabled, tabIndex} = props
  const [data, setData] = useState<{title: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef<{cancel: () => void} | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.cancel()
    ref.current = fetchDocument(documentId, setData, setLoading)
  }, [documentId])

  return (
    <Card as="button" disabled={disabled} padding={3} tabIndex={tabIndex}>
      {loading && (
        <Text muted>
          <>Loading…</>
        </Text>
      )}

      {!loading && <Text muted={!data}>{data ? data.title : <>Untitled</>}</Text>}
    </Card>
  )
}

function search(
  query: string,
  onResults: (results: BaseAutocompleteOption[]) => void,
  onLoading: (flag: boolean) => void
) {
  const fakeDelay = 150 + Math.random() * 800

  onLoading(true)

  const timeout = setTimeout(() => {
    const results: BaseAutocompleteOption[] = countries
      .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
      .map((d) => ({value: d.code}))

    onResults(results)
    onLoading(false)
  }, fakeDelay)

  return {
    cancel: () => {
      clearTimeout(timeout)
    },
  }
}

function fetchDocument(
  id: string,
  onResult: (value: {title: string} | null) => void,
  onLoading: (flag: boolean) => void
) {
  const fakeDelay = 50 + Math.random() * 400

  onLoading(true)

  const timeout = setTimeout(() => {
    const rec = countries.find((c) => c.code === id)

    const doc = rec && {title: rec.name}

    onResult(doc || null)
    onLoading(false)
  }, fakeDelay)

  return {
    cancel: () => {
      clearTimeout(timeout)
    },
  }
}
