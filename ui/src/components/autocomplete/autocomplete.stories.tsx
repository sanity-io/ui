import {LinkIcon} from '@sanity/icons'
import {
  Autocomplete,
  BaseAutocompleteOption,
  Box,
  BoundaryElementProvider,
  Button,
  Card,
  Code,
  Label,
  LayerProvider,
  Stack,
  Text,
} from '@sanity/ui'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import countries from './__fixtures__/countries'

interface ExampleOption {
  value: string
  title: string
}

export default {
  decorators: [withKnobs],
  title: 'Components/Autocomplete',
}

export function _default() {
  const options = countries.map((country) => ({value: country.code}))

  const customValidity = text('Custom validity', '', 'Props') || undefined

  const fontSize = Number(
    select(
      'Font size',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  const openButton = boolean('Open button', false, 'Props')

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3 (default)': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    3,
    'Props'
  )

  const radius = Number(
    select(
      'Radius',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  return (
    <Card padding={4}>
      <Autocomplete
        customValidity={customValidity}
        fontSize={fontSize}
        id="default"
        openButton={openButton}
        options={options}
        padding={padding}
        radius={radius}
      />
    </Card>
  )
}

export const custom = () => {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))

  const border = boolean('Border', true, 'Props')

  const fontSize = Number(
    select(
      'Font size',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  const radius = Number(
    select(
      'Radius',
      {
        '0': '0',
        '1': '1',
        '2 (default)': '2',
        '3': '3',
        '4': '4',
      },
      '2',
      'Props'
    )
  )

  return (
    <Card padding={4}>
      <CustomExample border={border} data={data} fontSize={fontSize} radius={radius} />
    </Card>
  )
}

function CustomExample({
  border,
  data,
  fontSize,
  radius,
}: {
  border: boolean
  data: ExampleOption[]
  fontSize: number
  radius: number
}) {
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
    console.log('render value', {value: currentValue, option})

    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <Stack space={3}>
      <Label as="label" htmlFor="custom" id="custom-label">
        Search
      </Label>
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
  )
}

export const async = () => {
  return (
    <Card padding={4}>
      <AsyncExample />
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

function AsyncExample() {
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const [value, setValue] = useState('')
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const fetchCurrentRef = useRef<{cancel: () => void} | null>(null)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)

  const doSearch = useCallback((query: string | null) => {
    console.log('search', query)
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      console.log('handleQueryChange', {query})

      if (query !== null) {
        doSearch(query)
      }
    },
    [doSearch]
  )

  const handleOpenButtonClick = useCallback(() => {
    console.log('handleOpenButtonClick')

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
    <Stack space={3}>
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
        renderOption={renderOption}
        renderValue={renderValue}
        value={value}
      />

      <Card overflow="auto" padding={3} shadow={1}>
        <Code language="json">{JSON.stringify({loading, options, value}, null, 2)}</Code>
      </Card>
    </Stack>
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

export const constrainedHeight = () => {
  return <ConstrainedHeightExample />
}

function ConstrainedHeightExample() {
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
    console.log('render value', {value: currentValue, option})

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
