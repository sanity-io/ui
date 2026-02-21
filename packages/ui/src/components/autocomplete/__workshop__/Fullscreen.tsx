import {CloseIcon, SearchIcon} from '@sanity/icons'
import {
  Autocomplete,
  Badge,
  type BaseAutocompleteOption,
  Box,
  Button,
  Card,
  Flex,
  Layer,
  Portal,
  PortalProvider,
  Selectable,
  Stack,
  Text,
  TextSkeleton,
  Tooltip,
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
              inset={0}
              padding={4}
              position="absolute"
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
              inset={0}
              padding={4}
              position="absolute"
              // shadow={1}
              tone="default"
              // style={{position: 'absolute', inset: '0 0 0 0'}}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
            >
              <Flex align="center" height="fill" justify="center">
                <Text align="center" muted size={1}>
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
            tone="default"
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
    <Card display="flex" flexDirection="column" minHeight="full">
      <PortalProvider element={portalElement}>
        <Card hidden={open} padding={2}>
          <Flex align="center">
            <Box flex={1} />
            <Tooltip placement="bottom" text="Open search">
              <Button
                ref={openSearchButtonElementRef}
                aria-label="Open search"
                icon={SearchIcon}
                mode="bleed"
                onClick={handleOpen}
              />
            </Tooltip>
          </Flex>
        </Card>
        <Layer hidden={!open} style={{position: 'sticky', top: 0}}>
          <Card display="flex" gap={2} padding={2} shadow={1}>
            <Autocomplete
              ref={inputRef}
              border={false}
              filterOption={filterOption}
              flex={1}
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
              value={value}
              onQueryChange={handleQueryChange}
              onSelect={handleSelect}
            />

            <Tooltip placement="bottom" text="Close search">
              <Button
                ref={setCloseSearchButtonElement}
                aria-label="Close search"
                flex="none"
                icon={CloseIcon}
                mode="bleed"
                onClick={handleClose}
              />
            </Tooltip>
          </Card>
        </Layer>
        <Card ref={setPortalElement} flex={1} hidden={!open} position="relative" />
        <Box flex={1} hidden={open} padding={4}>
          <Text size={1} weight="medium">
            Welcome to this app
          </Text>
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
    <Selectable
      aria-label={data?.title}
      as="button"
      disabled={disabled}
      padding={2}
      radius={3}
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
                <Text muted={!data} size={1} textOverflow="ellipsis" weight="medium">
                  {data ? data.title : <>Untitled</>}
                </Text>
                <Text muted size={1}>
                  {data?.code}
                </Text>
              </>
            )}
          </Stack>
        </Box>
        <Box paddingX={1}>
          {/* <Label muted size={0}>
            Country
          </Label> */}
          <Badge>Country</Badge>
        </Box>
      </Flex>
    </Selectable>
  )
}
