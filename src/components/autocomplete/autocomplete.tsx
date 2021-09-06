import {ChevronDownIcon, SpinnerIcon} from '@sanity/icons'
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled, {keyframes} from 'styled-components'
import {EMPTY_ARRAY} from '../../constants'
import {focusFirstDescendant} from '../../helpers'
import {useForwardedRef, useResponsiveProp} from '../../hooks'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  Popover,
  PopoverProps,
  Stack,
  Text,
  TextInput,
} from '../../primitives'
import {Placement, PopoverMargins} from '../../types'
import {AutocompleteOption} from './autocompleteOption'

/**
 * @public
 */
export type AutocompleteOpenButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>

/**
 * @public
 */
export interface BaseAutocompleteOption {
  value: string
}

/**
 * @public
 */
export interface AutocompleteProps<Option extends BaseAutocompleteOption> {
  border?: boolean
  customValidity?: string
  filterOption?: (query: string, option: Option) => boolean
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  id: string
  /**
   * @beta
   */
  listBox?: BoxProps
  loading?: boolean
  onChange?: (value: string) => void
  onQueryChange?: (query: string | null) => void
  onSelect?: (value: string) => void
  /**
   * @beta
   */
  openButton?: boolean | AutocompleteOpenButtonProps
  options?: Option[]
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'>
  prefix?: React.ReactNode
  radius?: number | number[]
  renderOption?: (option: Option) => React.ReactElement
  /**
   * @beta
   */
  renderPopover?: (
    props: {
      content: React.ReactElement | null
      hidden: boolean
      inputElement: HTMLInputElement | null
    },
    ref: React.Ref<HTMLDivElement>
  ) => React.ReactNode
  renderValue?: (value: string, option?: Option) => string
  suffix?: React.ReactNode
  value?: string
}

const POPOVER_MARGINS: PopoverMargins = [0, 1, 1, 1]
const POPOVER_PLACEMENT: Placement = 'bottom-start'
const POPOVER_FALLBACK_PLACEMENTS: Placement[] = ['top-start']

const Root = styled.div`
  position: relative;
`

const ListBox = styled(Box)`
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const ResultsPopover = styled(Popover)`
  & > div {
    min-height: 43px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &[data-popper-reference-hidden='true'] {
    display: none;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const AnimatedSpinnerIcon = styled(SpinnerIcon)`
  animation: ${rotate} 500ms linear infinite;
`

const EMPTY_RECORD = {}

const defaultRenderValue = (value: string, option?: BaseAutocompleteOption) =>
  option ? option.value : value

const defaultFilterOption = (query: string, option: BaseAutocompleteOption) =>
  option.value.toLowerCase().indexOf(query.toLowerCase()) > -1

const LIST_IGNORE_KEYS = [
  'Control',
  'Shift',
  'Alt',
  'Enter',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'Meta',
  'Tab',
  'CapsLock',
]

const InnerAutocomplete = forwardRef(function InnerAutocomplete<
  Option extends BaseAutocompleteOption
>(
  props: AutocompleteProps<Option> &
    Omit<
      React.HTMLProps<HTMLInputElement>,
      | 'aria-activedescendant'
      | 'aria-autocomplete'
      | 'aria-expanded'
      | 'aria-owns'
      | 'as'
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'id'
      | 'inputMode'
      | 'onChange'
      | 'onSelect'
      | 'prefix'
      | 'ref'
      | 'role'
      | 'spellCheck'
      | 'type'
      | 'value'
    >,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    border = true,
    customValidity,
    disabled,
    filterOption: filterOptionProp,
    fontSize = 2,
    icon,
    id,
    listBox = {},
    loading,
    onBlur,
    onChange,
    onFocus,
    onQueryChange,
    onSelect,
    openButton,
    options: optionsProp,
    padding: paddingProp = 3,
    popover = {},
    prefix,
    radius = 3,
    readOnly,
    renderOption: renderOptionProp,
    renderPopover,
    renderValue = defaultRenderValue,
    value: valueProp = '',
    ...restProps
  } = props

  const defaultRenderOption = useCallback(
    ({value}: BaseAutocompleteOption) => (
      <Card data-as="button" padding={paddingProp} radius={2} tone="inherit">
        <Text size={fontSize} textOverflow="ellipsis">
          {value}
        </Text>
      </Card>
    ),
    [fontSize, paddingProp]
  )

  const renderOption =
    typeof renderOptionProp === 'function' ? renderOptionProp : defaultRenderOption
  const filterOption =
    typeof filterOptionProp === 'function' ? filterOptionProp : defaultFilterOption
  const [value, setValue] = useState(valueProp)
  const [query, setQuery] = useState<string | null>(null)
  const valueRef = useRef(value)
  const [focused, setFocused] = useState(false)
  const listboxId = `${id}-listbox`
  const options = Array.isArray(optionsProp) ? optionsProp : EMPTY_ARRAY
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const padding = useResponsiveProp(paddingProp)
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const [resultsPopoverElement, setResultsPopoverElement] = useState<HTMLDivElement | null>(null)
  const currentOption = value ? options.find((o) => o.value === value) : undefined
  const filteredOptions = useMemo(
    () => options.filter((option) => (query ? filterOption(query, option) : true)),
    [filterOption, options, query]
  )
  const activeItemId = filteredOptions[activeIndex]
    ? `${id}-option-${filteredOptions[activeIndex].value}`
    : undefined
  const optionsLen = filteredOptions.length
  const expanded = (query !== null && loading) || (focused && optionsLen > 0 && query !== null)
  const forwardedRef = useForwardedRef(ref)
  const popoverMouseWithinRef = useRef(false)

  const handleRootBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        // NOTE: This is a workaround for a bug that may happen in Chrome (clicking the scrollbar
        // closes the results in certain situations):
        // - Do not handle blur if the mouse is within the popover
        if (popoverMouseWithinRef.current) {
          return
        }

        const focusedEl = document.activeElement
        const focusInside =
          (focusedEl && rootElement && rootElement.contains(focusedEl)) ||
          (focusedEl && resultsPopoverElement && resultsPopoverElement.contains(focusedEl))

        if (!focusInside) {
          setFocused(false)
          setQuery(null)
          if (onQueryChange) onQueryChange(null)
          if (onBlur) onBlur(event)
        }
      }, 0)
    },
    [onBlur, onQueryChange, resultsPopoverElement, rootElement]
  )

  const handleOptionSelect = useCallback(
    (v: string) => {
      if (onSelect) onSelect(v)
      setValue(v)
      if (onChange) onChange(v)
      setQuery(null)
      if (onQueryChange) onQueryChange(null)
      setFocused(false)
      inputRef.current?.focus()
      popoverMouseWithinRef.current = false
    },
    [onChange, onSelect, onQueryChange]
  )

  const handleRootKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const filteredOptionsLen = filteredOptions.length

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (!filteredOptionsLen) return
        setActiveIndex((index) => (index + 1) % filteredOptionsLen)

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (!filteredOptionsLen) return
        setActiveIndex((index) => {
          return index === -1
            ? filteredOptionsLen - 1
            : (filteredOptionsLen + index - 1) % filteredOptionsLen
        })

        return
      }

      if (event.key === 'Escape') {
        setFocused(false)
        valueRef.current = ''
        setQuery(null)
        if (onQueryChange) onQueryChange(null)

        inputRef.current?.focus()

        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()

        const activeOpen = filteredOptions[activeIndex]

        if (activeOpen) {
          handleOptionSelect(activeOpen.value)
        }

        return
      }

      const target = event.target as Node
      const listEl = listRef.current

      if (
        (listEl === target || listEl?.contains(target)) &&
        !LIST_IGNORE_KEYS.includes(event.key)
      ) {
        inputRef.current?.focus()

        return
      }
    },
    [filteredOptions, handleOptionSelect, onQueryChange, activeIndex]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const q = event.currentTarget.value

      valueRef.current = q
      setQuery(q)

      if (!focused) {
        setFocused(true)
      }

      if (onQueryChange) onQueryChange(q)
    },
    [focused, onQueryChange]
  )

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!focused) {
        setFocused(true)
        if (onFocus) onFocus(event)
      }
    },
    [focused, onFocus]
  )

  const handlePopoverMouseEnter = useCallback(() => {
    popoverMouseWithinRef.current = true
  }, [])

  const handlePopoverMouseLeave = useCallback(() => {
    popoverMouseWithinRef.current = false
  }, [])

  const handleClearButtonClick = useCallback(() => {
    valueRef.current = ''
    setValue('')
    if (onChange) onChange('')
    setQuery(null)
    if (onQueryChange) onQueryChange(null)
    inputRef.current?.focus()
  }, [onChange, onQueryChange])

  const handleClearButtonFocus = useCallback(() => setFocused(true), [])

  // Change the value when `value` prop changes
  useEffect(() => {
    if (valueProp !== valueRef.current) {
      valueRef.current = valueProp
      setValue(valueProp)
      setQuery(null)
    }
  }, [valueProp])

  // Reset selected item when the list changes
  // @todo: what if the list length didn’t change, but the list contents changed?
  useEffect(() => setActiveIndex(-1), [optionsLen])

  // Focus the selected item
  useEffect(() => {
    const listElement = listRef.current

    if (!listElement) return

    const activeItemElement = listElement.childNodes[activeIndex] as HTMLLIElement | undefined

    if (activeItemElement) {
      focusFirstDescendant(activeItemElement)
    }
  }, [activeIndex])

  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el
      forwardedRef.current = el
    },
    [forwardedRef]
  )

  const clearButton = useMemo(() => {
    if (!loading && !disabled && value.length > 0) {
      return {
        'aria-label': 'Clear',
        onFocus: handleClearButtonFocus,
      }
    }

    return undefined
  }, [disabled, handleClearButtonFocus, loading, value])

  const openButtonBoxPadding = useMemo(() => padding.map((v) => v - 2), [padding])
  const openButtonPadding = useMemo(() => padding.map((v) => v - 1), [padding])
  const openButtonProps: AutocompleteOpenButtonProps = useMemo(
    () => (typeof openButton === 'object' ? openButton : EMPTY_RECORD),
    [openButton]
  )

  const handleOpenClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      inputRef.current?.focus()
      setQuery(query || renderValue(value, currentOption) || '')
      if (openButtonProps.onClick) openButtonProps.onClick(event)
    },
    [currentOption, openButtonProps, query, renderValue, value]
  )

  const openButtonNode = useMemo(
    () =>
      !disabled && !readOnly && openButton ? (
        <Box padding={openButtonBoxPadding}>
          <Button
            {...openButtonProps}
            fontSize={fontSize}
            icon={ChevronDownIcon}
            mode="bleed"
            onClick={handleOpenClick}
            padding={openButtonPadding}
          />
        </Box>
      ) : undefined,
    [
      disabled,
      fontSize,
      handleOpenClick,
      openButton,
      openButtonBoxPadding,
      openButtonPadding,
      openButtonProps,
      readOnly,
    ]
  )

  const input = (
    <TextInput
      {...restProps}
      aria-activedescendant={activeItemId}
      aria-autocomplete="list"
      aria-expanded={expanded}
      aria-owns={listboxId}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      border={border}
      clearButton={clearButton}
      customValidity={customValidity}
      disabled={disabled}
      fontSize={fontSize}
      icon={icon}
      iconRight={loading && AnimatedSpinnerIcon}
      id={id}
      inputMode="search"
      onChange={handleInputChange}
      onClear={handleClearButtonClick}
      onFocus={handleInputFocus}
      padding={padding}
      prefix={prefix}
      radius={radius}
      readOnly={readOnly}
      ref={setRef}
      role="combobox"
      spellCheck={false}
      suffix={openButtonNode}
      value={query === null ? renderValue(value, currentOption) : query}
    />
  )

  const content = useMemo(() => {
    if (filteredOptions.length === 0) return null

    return (
      <ListBox padding={1} {...listBox} tabIndex={-1}>
        <Stack
          as="ul"
          aria-multiselectable={false}
          id={listboxId}
          ref={listRef}
          role="listbox"
          space={1}
        >
          {filteredOptions.map((option, optionIndex) => {
            const active = activeIndex > -1 ? optionIndex === activeIndex : currentOption === option

            return (
              <AutocompleteOption
                id={`${id}-option-${option.value}`}
                key={option.value}
                onSelect={handleOptionSelect}
                selected={active}
                value={option.value}
              >
                {cloneElement(renderOption(option), {
                  'data-selected': active ? '' : undefined,
                  disabled: loading,
                  tabIndex: active ? 0 : -1,
                })}
              </AutocompleteOption>
            )
          })}
        </Stack>
      </ListBox>
    )
  }, [
    currentOption,
    filteredOptions,
    handleOptionSelect,
    id,
    listBox,
    listboxId,
    loading,
    renderOption,
    activeIndex,
  ])

  const results = useMemo(() => {
    if (renderPopover) {
      return renderPopover(
        {content, hidden: !expanded, inputElement: inputRef.current},
        setResultsPopoverElement
      )
    }

    return (
      <ResultsPopover
        __unstable_margins={POPOVER_MARGINS}
        arrow={false}
        constrainSize
        content={content}
        fallbackPlacements={POPOVER_FALLBACK_PLACEMENTS}
        matchReferenceWidth
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        open={expanded}
        portal
        placement={POPOVER_PLACEMENT}
        radius={radius}
        ref={setResultsPopoverElement}
        referenceElement={inputRef.current}
        {...popover}
      />
    )
  }, [
    content,
    expanded,
    handlePopoverMouseEnter,
    handlePopoverMouseLeave,
    popover,
    radius,
    renderPopover,
  ])

  return (
    <Root
      data-ui="Autocomplete"
      onBlur={handleRootBlur}
      onKeyDown={handleRootKeyDown}
      ref={setRootElement}
    >
      {input}
      {results}
    </Root>
  )
})

/**
 * @public
 */
export const Autocomplete = InnerAutocomplete as <Option extends BaseAutocompleteOption>(
  props: AutocompleteProps<Option> &
    Omit<
      React.HTMLProps<HTMLInputElement>,
      | 'aria-activedescendant'
      | 'aria-autocomplete'
      | 'aria-expanded'
      | 'aria-owns'
      | 'as'
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'id'
      | 'inputMode'
      | 'onChange'
      | 'onSelect'
      | 'prefix'
      | 'ref'
      | 'role'
      | 'spellCheck'
      | 'type'
      | 'value'
    > & {
      ref?: React.Ref<HTMLInputElement>
    }
) => React.ReactElement
