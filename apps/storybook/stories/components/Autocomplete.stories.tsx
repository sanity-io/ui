import {CloseIcon} from '@sanity/icons/Close'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'
import {SearchIcon} from '@sanity/icons/Search'
import {
  Autocomplete,
  AutocompleteProps,
  BaseAutocompleteOption,
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Code,
  Container,
  Flex,
  Heading,
  Label,
  Layer,
  LayerProvider,
  Popover,
  Portal,
  PortalProvider,
  Skeleton,
  Stack,
  Text,
  TextSkeleton,
  ToastProvider,
  useToast,
} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {RADII} from '../constants'
import {rowBuilder} from '../helpers/rowBuilder'
import {countriesStore} from './__mocks__/apiStore'
import countries from './__mocks__/countries'

interface ExampleOption {
  value: string
  title: string
}

const meta: Meta<typeof Autocomplete> = {
  args: {
    icon: SearchIcon,
    options: [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}],
    placeholder: 'Search...',
  },
  component: Autocomplete,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Card paddingBottom={8} paddingTop={3}>
        {/* @ts-expect-error fix later */}
        <Story />
      </Card>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Loading: Story = {
  args: {loading: true},
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Radius: Story = {
  render: (props) => (
    <>
      {rowBuilder({
        gap: 4,
        renderItem: ({value, index}) => (
          <Autocomplete {...props} key={index} placeholder={String(value)} radius={value} />
        ),
        rows: RADII,
      })}
    </>
  ),
}

function CustomStory() {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))
  const fontSize = 2
  const padding = 3
  const radius = 2
  const [value, setValue] = useState('')

  const renderOption = useCallback(
    (option: ExampleOption) => (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={padding}
        radius={radius - 1}
      >
        <Text size={fontSize}>{option.title}</Text>
      </Card>
    ),
    [],
  )

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <Box paddingX={[4, 5, 6]} paddingY={[5, 6, 7]}>
      <Container width={0}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={5}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack space={3}>
            <Text as="label" htmlFor="custom" id="custom-label" size={1} weight="medium">
              Country
            </Text>
            <Autocomplete
              aria-describedby="custom-label"
              border
              filterOption={filterOption}
              fontSize={fontSize}
              id="custom"
              onChange={setValue}
              openButton
              options={options}
              padding={padding}
              placeholder="Search"
              radius={radius}
              renderOption={renderOption}
              renderValue={renderValue}
              value={value}
            />
          </Stack>

          <Card padding={3} radius={2} tone="transparent">
            <Code size={1}>{JSON.stringify(value)}</Code>
          </Card>
          <Box>
            <Button id="set-value-btn" onClick={() => setValue('NO')} text="Set to NO" />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export const Custom: Story = {
  parameters: {controls: {include: []}},
  render: () => <CustomStory />,
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    // oxlint-disable-next-line no-unsafe-type-assertion
    const input = () => doc.getElementById('custom') as HTMLInputElement
    const listbox = () => doc.getElementById('custom-listbox')
    const option = (value: string) => doc.querySelector(`[data-qa="option-${value}"]`)

    await step('should use key arrows', async () => {
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // The listbox is expanded
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'true'))
      await waitFor(() => expect(listbox()).toBeInTheDocument())

      // Arrow down 3 times
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // The 3rd option should be focused
      await waitFor(() => expect(option('NO')).toHaveFocus())

      // Escape to close listbox and clear input
      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveValue('')
    })

    await step('should press clear button to clear', async () => {
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // Arrow down 3 times
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NO')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      // Tab 1 time
      await waitFor(() => expect(input()).toHaveFocus())
      await userEvent.tab()

      // Enter to clear
      const clearButton = doc.querySelector<HTMLButtonElement>('[data-qa="clear-button"]')!

      await waitFor(() => expect(clearButton).toHaveFocus())
      await userEvent.click(clearButton)

      // The input should be empty and focused
      await waitFor(() => expect(input()).toHaveValue(''))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveFocus()
    })

    await step('should collapse when tabbing out', async () => {
      // Click to focus
      await userEvent.click(input())
      await waitFor(() => expect(input()).toHaveFocus())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // The input is expanded and focused
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'true'))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveFocus()

      // Focus the next focusable element
      doc.getElementById('set-value-btn')!.focus()

      // Should be collapsed
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
    })

    await step('should clear query on blur', async () => {
      // Click to focus
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // Arrow down 3 times
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NO')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      await waitFor(() => expect(input()).toHaveValue('Norway'))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveFocus()

      // Click to focus
      await userEvent.click(input())

      // Search for "net"
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}')
      await userEvent.type(input(), 'net')

      // Tab out of autocomplete
      doc.getElementById('set-value-btn')!.focus()

      // Expect the value to be "Norway" and autocomplete to be collapsed
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
      await waitFor(() => expect(input()).toHaveValue('Norway'))
    })

    await step('should search anew after selecting a value', async () => {
      // Click to focus
      await userEvent.click(input())

      // Search for "net"
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}')
      await userEvent.type(input(), 'net')

      // Arrow down 1 time
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NL')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      // Expect "Netherlands" to be selected
      await waitFor(() => expect(input()).toHaveValue('Netherlands'))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveFocus()
    })
  },
}

function AsyncStory() {
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const fetchRef = useRef<{cancel: () => void} | null>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)

  const doSearch = useCallback((query: string | null) => {
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = countriesStore.search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      setQuery(query)

      if (query !== null) {
        doSearch(query)
      }
    },
    [doSearch],
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
    if (fetchRef.current) fetchRef.current.cancel()

    if (value) {
      fetchRef.current = countriesStore.fetchDocument(
        value,
        (data) => setOptionTitle(data?.title || null),
        setLoadingCurrentRef,
      )
    } else {
      // oxlint-disable-next-line react-compiler
      setOptionTitle(null)
      setLoadingCurrentRef(false)
    }
  }, [value])

  useEffect(() => {
    if (optionTitle) doSearch(optionTitle)
  }, [doSearch, optionTitle])

  return (
    <Box paddingX={[4, 5, 6]} paddingY={[5, 6, 7]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={[3, 3, 4]}>
        <Text as="label" htmlFor="async" size={[1, 1, 2]} weight="medium">
          Country
        </Text>
        <LayerProvider zOffset={100}>
          <Autocomplete
            disabled={loadingCurrentRef}
            filterOption={filterOption}
            icon={value ? EarthAmericasIcon : SearchIcon}
            id="async"
            loading={loading}
            onChange={setValue}
            onQueryChange={handleQueryChange}
            openButton={{onClick: handleOpenButtonClick}}
            options={options}
            placeholder="Search"
            renderOption={renderOption}
            renderValue={renderValue}
            value={value}
          />
        </LayerProvider>

        <Card overflow="auto" padding={3} radius={2} tone="transparent">
          <Code language="json" size={1}>
            {JSON.stringify({loading, options, query, value}, null, 2)}
          </Code>
        </Card>
      </Stack>
    </Box>
  )
}

function AsyncOption(props: {
  documentId: string
  disabled?: boolean
  selected?: boolean
  tabIndex?: number
}) {
  const {documentId, disabled, selected, tabIndex} = props
  const [data, setData] = useState<{title: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef<{cancel: () => void} | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.cancel()
    ref.current = countriesStore.fetchDocument(documentId, setData, setLoading)
  }, [documentId])

  return (
    <Card
      data-as="button"
      disabled={disabled}
      padding={3}
      radius={1}
      selected={selected}
      tabIndex={tabIndex}
    >
      <Flex gap={3}>
        <Text>
          <EarthAmericasIcon />
        </Text>

        {loading && (
          <Text muted>
            <>Loading…</>
          </Text>
        )}

        {!loading && <Text muted={!data}>{data ? data.title : <>Untitled</>}</Text>}
      </Flex>
    </Card>
  )
}

export const Async: Story = {
  parameters: {controls: {include: []}},
  render: () => <AsyncStory />,
}

function ConstrainedHeightStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card height="fill" tone="transparent">
      <Container height="fill" padding={3} sizing="border" width={1}>
        <Card
          height="fill"
          ref={setBoundaryElement}
          radius={3}
          shadow={3}
          style={{position: 'relative'}}
        >
          <Box height="fill" overflow="auto" padding={[4, 4, 5]} sizing="border">
            {/* oxlint-disable-next-line no-deprecated */}
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
      </Container>
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
        radius={2}
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

  const renderPopover: AutocompleteProps['renderPopover'] = useCallback(
    (
      popoverProps: {
        content: React.JSX.Element | null
        hidden: boolean
        inputElement: HTMLInputElement | null
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      popoverRef: React.Ref<HTMLDivElement>,
    ) => {
      const {hidden, inputElement, ...restProps} = popoverProps

      if (hidden) return null

      return (
        <Popover
          {...restProps}
          arrow={false}
          constrainSize
          matchReferenceWidth
          open
          overflow="auto"
          placement="bottom-start"
          radius={1}
          ref={popoverRef}
          referenceElement={inputElement}
        />
      )
    },
    [],
  )

  return (
    // oxlint-disable-next-line no-deprecated
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
          placeholder="Search"
          radius={1}
          renderOption={renderOption}
          renderPopover={renderPopover}
          renderValue={renderValue}
          value={value}
        />
      </LayerProvider>
    </Stack>
  )
}

export const ConstrainedHeight: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => <ConstrainedHeightStory />,
}

function FocusAndBlurStory() {
  const [value, setValue] = useState('')
  const [log, setLog] = useState<string[]>([])
  const handleBlur = useCallback(() => setLog((v) => v.concat(['blur'])), [])
  const handleFocus = useCallback(() => setLog((v) => v.concat(['focus'])), [])
  const handleClear = useCallback(() => setLog([]), [])

  return (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={3}>
        <Autocomplete
          id="focus-and-blur"
          onBlur={handleBlur}
          onChange={setValue}
          onFocus={handleFocus}
          openButton
          options={[{value: 'foo'}, {value: 'bar'}]}
          placeholder="Search"
          value={value}
        />
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={3}>
          <Card overflow="auto" padding={3} radius={2} tone="transparent">
            <Code id="focus-and-blur-log" language="json" size={1}>
              {JSON.stringify(log)}
            </Code>
          </Card>

          <Button id="focus-and-blur-clear-btn" mode="ghost" onClick={handleClear} text="Clear" />
        </Stack>
      </Stack>
    </Box>
  )
}

export const FocusAndBlur: Story = {
  parameters: {controls: {include: []}},
  render: () => <FocusAndBlurStory />,
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    // oxlint-disable-next-line no-unsafe-type-assertion
    const input = () => doc.getElementById('focus-and-blur') as HTMLInputElement
    const log = () => doc.getElementById('focus-and-blur-log')

    await step('should trigger focus and blur', async () => {
      // Click to focus
      await userEvent.click(input())
      await waitFor(() => expect(log()).toHaveTextContent('["focus"]'))

      // Click outside to blur
      await userEvent.click(doc.body)
      await waitFor(() => expect(log()).toHaveTextContent('["focus","blur"]'))

      // Clear log
      await userEvent.click(doc.getElementById('focus-and-blur-clear-btn')!)

      // Click to focus
      await userEvent.click(input())

      // Search for "foo"
      await userEvent.type(input(), 'foo')
      await waitFor(() => expect(doc.getElementById('focus-and-blur-listbox')).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')

      const option = doc.querySelector<HTMLElement>('#focus-and-blur-option-foo > div')!

      await waitFor(() => expect(option).toHaveFocus())
      await userEvent.click(option)

      // Expect "foo" to be selected, without the input having lost focus in the meantime
      await waitFor(() => expect(input()).toHaveValue('foo'))
      // oxlint-disable-next-line no-floating-promises
      expect(input()).toHaveFocus()
      // oxlint-disable-next-line no-floating-promises
      expect(log()).toHaveTextContent('["focus"]')

      // Click outside to blur
      await userEvent.click(doc.body)
      await waitFor(() => expect(log()).toHaveTextContent('["focus","blur"]'))
    })
  },
}

function FullscreenStory() {
  const {push: pushToast} = useToast()
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [closeSearchButtonElement, setCloseSearchButtonElement] =
    useState<HTMLButtonElement | null>(null)
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])
  const searchRef = useRef<{cancel: () => void} | null>(null)
  const fetchRef = useRef<{cancel: () => void} | null>(null)
  const openSearchButtonElementRef = useRef<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingCurrentRef, setLoadingCurrentRef] = useState(false)
  const [open, setOpen] = useState(false)
  const [optionTitle, setOptionTitle] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')

  const relatedElements = useMemo(
    // oxlint-disable-next-line no-unsafe-type-assertion
    () => [closeSearchButtonElement].filter(Boolean) as HTMLElement[],
    [closeSearchButtonElement],
  )

  const search = useCallback((query: string | null) => {
    if (searchRef.current) searchRef.current.cancel()
    searchRef.current = countriesStore.search(query || '', setOptions, setLoading)
  }, [])

  const filterOption = useCallback(() => true, [])

  const handleClose = useCallback(() => setOpen(false), [])

  const handleQueryChange = useCallback(
    (query: string | null) => {
      if (query !== null) search(query)
      setQuery(query)
    },
    [search],
  )

  const handleOpen = useCallback(() => {
    setValue('')
    setOpen(true)
  }, [])

  const handleSelect = useCallback(
    (v: string) => {
      setOpen(false)
      setValue(v)
      pushToast({status: 'info', title: `Selected “${v}”`})
    },
    [pushToast],
  )

  const renderOption = useCallback((option: BaseAutocompleteOption) => {
    return <FullscreenAsyncOption documentId={option.value} />
  }, [])

  const renderPopover = useCallback(
    (
      props: {
        content: React.ReactNode
        hidden: boolean
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      ref: React.Ref<HTMLDivElement>,
    ) => {
      if (!props.hidden && query && !loading && options.length === 0) {
        return (
          <Portal>
            <Card
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              padding={4}
              style={{position: 'absolute', inset: '0 0 0 0'}}
            >
              <Flex align="center" height="fill" justify="center">
                <Text align="center" muted>
                  No results for <strong>‘{query}’</strong>
                </Text>
              </Flex>
            </Card>
          </Portal>
        )
      }

      return (
        <Portal>
          <Card
            hidden={props.hidden}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            ref={ref}
          >
            {props.content}
          </Card>
        </Portal>
      )
    },
    [loading, options, query],
  )

  const renderValue = useCallback(() => {
    if (loadingCurrentRef) {
      return 'Loading…'
    }

    return optionTitle || ''
  }, [loadingCurrentRef, optionTitle])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    if (!open) openSearchButtonElementRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (fetchRef.current) fetchRef.current.cancel()

    if (value) {
      fetchRef.current = countriesStore.fetchDocument(
        value,
        (data) => setOptionTitle(data?.title || null),
        setLoadingCurrentRef,
      )
    } else {
      // oxlint-disable-next-line react-compiler
      setOptionTitle(null)
      setLoadingCurrentRef(false)
    }
  }, [value])

  return (
    <Card style={{display: 'flex', flexDirection: 'column', minHeight: '100%'}} tone="transparent">
      <PortalProvider element={portalElement}>
        <Flex direction="column" flex={1} height="fill">
          <Card hidden={open} padding={2}>
            <Flex align="center">
              <Box flex={1} />
              <Button
                aria-label="Open search"
                icon={SearchIcon}
                mode="ghost"
                onClick={handleOpen}
                ref={openSearchButtonElementRef}
              />
            </Flex>
          </Card>
          <Layer hidden={!open} style={{position: 'sticky', top: 0}}>
            <Card padding={2} shadow={1}>
              <Autocomplete
                filterOption={filterOption}
                icon={SearchIcon}
                id="fullsceen-example"
                listBox={{padding: 2}}
                loading={loading}
                onQueryChange={handleQueryChange}
                onSelect={handleSelect}
                options={options}
                placeholder="Search"
                radius={2}
                ref={inputRef}
                relatedElements={relatedElements}
                renderOption={renderOption}
                renderPopover={renderPopover}
                renderValue={renderValue}
                suffix={
                  <Box padding={1}>
                    <Button
                      aria-label="Close search"
                      icon={CloseIcon}
                      onClick={handleClose}
                      padding={2}
                      mode="bleed"
                      ref={setCloseSearchButtonElement}
                    />
                  </Box>
                }
                value={value}
              />
            </Card>
          </Layer>
          <Card flex={1} hidden={!open} ref={setPortalElement} style={{position: 'relative'}} />
          <Box flex={1} hidden={open} padding={4}>
            <Heading>Welcome to this app</Heading>
          </Box>
        </Flex>
      </PortalProvider>
    </Card>
  )
}

function FullscreenAsyncOption(props: {
  documentId: string
  disabled?: boolean
  selected?: boolean
  tabIndex?: number
}) {
  const {documentId, disabled, selected, tabIndex} = props
  const [data, setData] = useState<{code: string; title: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef<{cancel: () => void} | null>(null)

  useEffect(() => {
    if (ref.current) ref.current.cancel()
    ref.current = countriesStore.fetchDocument(documentId, setData, setLoading)
  }, [documentId])

  return (
    <Card
      aria-label={data?.title}
      data-as="a"
      disabled={disabled}
      padding={2}
      radius={2}
      selected={selected}
      style={{lineHeight: 0}}
      tabIndex={tabIndex}
    >
      <Flex align="center">
        <Skeleton radius={2} style={{width: 35, height: 35}} />
        <Box flex={1} marginLeft={3}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack space={2}>
            {loading && (
              <>
                <TextSkeleton style={{maxWidth: 200}} />
                <TextSkeleton size={1} style={{maxWidth: 120}} />
              </>
            )}
            {!loading && (
              <>
                <Text muted={!data} textOverflow="ellipsis">
                  {data ? data.title : <>Untitled</>}
                </Text>
                <Text muted size={1}>
                  {data?.code}
                </Text>
              </>
            )}
          </Stack>
        </Box>
        <Box paddingX={2}>
          <Label muted size={0}>
            Country
          </Label>
        </Box>
      </Flex>
    </Card>
  )
}

export const Fullscreen: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => (
    <ToastProvider>
      <FullscreenStory />
    </ToastProvider>
  ),
}
