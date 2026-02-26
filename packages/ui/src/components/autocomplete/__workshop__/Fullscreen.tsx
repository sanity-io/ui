import {CloseIcon, SearchIcon} from '@sanity/icons'
import {
  Autocomplete,
  type BaseAutocompleteOption,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Label,
  Layer,
  Portal,
  PortalProvider,
  Stack,
  Text,
  TextSkeleton,
  useToast,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {startTransition, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {countriesStore} from './mock/apiStore'

export default function FullscreenStory(): React.JSX.Element {
  const error = useBoolean('Error', false)

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
    return <AsyncOption documentId={option.value} />
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
      if (!props.hidden && error) {
        return (
          <Portal>
            <Card
              padding={4}
              style={{position: 'absolute', inset: '0 0 0 0'}}
              tone="critical"
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
            >
              <Flex align="center" height="fill" justify="center">
                <Text align="center" muted>
                  Something went wrong while searching
                </Text>
              </Flex>
            </Card>
          </Portal>
        )
      }

      if (!props.hidden && query && !loading && options.length === 0) {
        return (
          <Portal>
            <Card
              padding={4}
              style={{position: 'absolute', inset: '0 0 0 0'}}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
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
            ref={ref}
            hidden={props.hidden}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            {props.content}
          </Card>
        </Portal>
      )
    },
    [error, loading, options, query],
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
      startTransition(() => {
        setOptionTitle(null)
        setLoadingCurrentRef(false)
      })
    }
  }, [value])

  return (
    <Card display="flex" flexDirection="column" minHeight="full" tone="transparent">
      <PortalProvider element={portalElement}>
        <Card hidden={open} padding={2}>
          <Flex align="center">
            <Box flex={1} />
            <Button
              ref={openSearchButtonElementRef}
              aria-label="Open search"
              icon={SearchIcon}
              mode="bleed"
              onClick={handleOpen}
            />
          </Flex>
        </Card>
        <Layer hidden={!open} style={{position: 'sticky', top: 0}}>
          <Card padding={2} shadow={1}>
            <Autocomplete
              ref={inputRef}
              filterOption={filterOption}
              fontSize={1}
              icon={SearchIcon}
              id="fullsceen-example"
              listBox={{padding: 2}}
              loading={loading}
              options={options}
              placeholder="Search"
              radius={2}
              relatedElements={relatedElements}
              renderOption={renderOption}
              renderPopover={renderPopover}
              renderValue={renderValue}
              suffix={
                <Box padding={1}>
                  <Button
                    ref={setCloseSearchButtonElement}
                    aria-label="Close search"
                    icon={CloseIcon}
                    mode="bleed"
                    padding={2}
                    onClick={handleClose}
                  />
                </Box>
              }
              value={value}
              onQueryChange={handleQueryChange}
              onSelect={handleSelect}
            />
          </Card>
        </Layer>
        <Card ref={setPortalElement} flex={1} hidden={!open} position="relative" />
        <Box flex={1} hidden={open} padding={4}>
          <Heading>Welcome to this app</Heading>
        </Box>
      </PortalProvider>
    </Card>
  )
}

function AsyncOption(props: {
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
      as="button"
      disabled={disabled}
      padding={2}
      radius={2}
      selected={selected}
      style={{lineHeight: 0}}
      tabIndex={tabIndex}
    >
      <Flex align="center">
        <Box muted radius={2} style={{width: 35, height: 35}} />
        <Box flex={1} marginLeft={3}>
          <Stack gap={2}>
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
