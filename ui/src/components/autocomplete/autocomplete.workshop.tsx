import {LinkIcon} from '@sanity/icons'
import {
  Autocomplete,
  BaseAutocompleteOption,
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Code,
  LayerProvider,
  Stack,
  Text,
} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import countries from './__fixtures__/countries'

interface ExampleOption {
  value: string
  title: string
}

export default defineScope('components/autocomplete', 'Autocomplete', [
  {name: 'default', title: 'Default', component: DefaultStory},
  {name: 'custom', title: 'Custom', component: CustomStory},
  {name: 'async', title: 'Async', component: AsyncStory},
  {name: 'constrained-height', title: 'Constrained height', component: ConstrainedHeightStory},
  {name: 'focus-and-blur', title: 'Focus and blur', component: FocusAndBlurStory},
])

const TEXT_SIZE_OPTIONS = {
  '0': '0',
  '1': '1',
  '2 (default)': '2',
  '3': '3',
  '4': '4',
}

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

const RADIUS_OPTIONS = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
}

export function DefaultStory() {
  const options = countries.map((country) => ({value: country.code}))
  const customValidity = useText('Custom validity', '', 'Props') || undefined
  const fontSize = Number(useSelect('Font size', TEXT_SIZE_OPTIONS, '2', 'Props'))
  const openButton = useBoolean('Open button', false, 'Props')
  const padding = useSelect('Padding', SPACE_OPTIONS, 3, 'Props')
  const radius = Number(useSelect('Radius', RADIUS_OPTIONS, '2', 'Props'))

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Text as="label" htmlFor="default" size={1} weight="semibold">
          Country code
        </Text>
        <Autocomplete
          customValidity={customValidity}
          fontSize={fontSize}
          id="default"
          openButton={openButton}
          options={options}
          padding={padding}
          radius={radius}
        />
      </Stack>
    </Box>
  )
}

function CustomStory() {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))
  const border = useBoolean('Border', true, 'Props') || false
  const fontSize = Number(useSelect('Font size', TEXT_SIZE_OPTIONS, '2', 'Props'))
  const radius = Number(useSelect('Radius', RADIUS_OPTIONS, '2', 'Props'))
  const [value, setValue] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={3}
      >
        <Text>{option.title}</Text>
      </Card>
    )
  }, [])

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Text as="label" htmlFor="custom" id="custom-label" size={1} weight="semibold">
          Country
        </Text>
        <Autocomplete
          aria-describedby="custom-label"
          border={border}
          filterOption={filterOption}
          fontSize={fontSize}
          id="custom"
          onChange={setValue}
          options={options}
          radius={radius}
          renderOption={renderOption}
          renderValue={renderValue}
          value={value}
        />
        <Card padding={3} radius={1} tone="transparent">
          <Code>{JSON.stringify(value)}</Code>
        </Card>
        <Box>
          <Button id="set-value-btn" onClick={() => setValue('NO')} text="Set to NO" />
        </Box>
      </Stack>
    </Box>
  )
}

function AsyncStory() {
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

function ConstrainedHeightStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card height="fill" tone="transparent">
      <Card
        ref={setBoundaryElement}
        style={{position: 'absolute', top: 50, right: 50, bottom: 50, left: 50}}
      >
        <Box height="fill" overflow="auto" padding={[3, 4, 5]} sizing="border">
          <Stack space={5}>
            <BoundaryElementProvider element={boundaryElement}>
              <ConstrainedHeightExampleField id="example-1" label="Example 1" />
              <ConstrainedHeightExampleField id="example-2" label="Example 2" />
              <ConstrainedHeightExampleField id="example-3" label="Example 3" />
              <ConstrainedHeightExampleField id="example-4" label="Example 4" />
              <ConstrainedHeightExampleField id="example-5" label="Example 5" />
              <ConstrainedHeightExampleField id="example-6" label="Example 6" />
              <ConstrainedHeightExampleField id="example-7" label="Example 7" />
              <ConstrainedHeightExampleField id="example-8" label="Example 8" />
              <ConstrainedHeightExampleField id="example-9" label="Example 9" />
            </BoundaryElementProvider>
          </Stack>
        </Box>
      </Card>
    </Card>
  )
}

function ConstrainedHeightExampleField({id, label}: {id: string; label: string}) {
  const [value, setValue] = useState('')

  const renderOption = useCallback((option: ExampleOption) => {
    return (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={3}
      >
        <Text textOverflow="ellipsis">{option.title}</Text>
      </Card>
    )
  }, [])

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = countries.map((item) => ({value: item.code, title: item.name}))

  return (
    <Stack space={3}>
      <Text size={1} weight="medium">
        {label}
      </Text>
      <LayerProvider zOffset={100}>
        <Autocomplete
          filterOption={filterOption}
          id={id}
          onChange={setValue}
          openButton
          options={options}
          radius={1}
          renderOption={renderOption}
          renderValue={renderValue}
          value={value}
        />
      </LayerProvider>
    </Stack>
  )
}

function FocusAndBlurStory() {
  const [log, setLog] = useState<string[]>([])
  const handleBlur = useCallback(() => setLog((v) => v.concat(['blur'])), [])
  const handleFocus = useCallback(() => setLog((v) => v.concat(['focus'])), [])
  const handleClear = useCallback(() => setLog([]), [])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Autocomplete
          id="focus-and-blur"
          onBlur={handleBlur}
          onFocus={handleFocus}
          openButton
          options={[{value: 'foo'}, {value: 'bar'}]}
        />
        <Stack space={1}>
          <Card overflow="auto" padding={3} radius={2} tone="transparent">
            <Code id="focus-and-blur-log">{JSON.stringify(log)}</Code>
          </Card>

          <Button id="focus-and-blur-clear-btn" onClick={handleClear} text="Clear" />
        </Stack>
      </Stack>
    </Box>
  )
}
