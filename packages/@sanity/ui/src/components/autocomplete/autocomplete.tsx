import {ChevronDownIcon} from '@sanity/icons'
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import {EMPTY_ARRAY} from '../../constants'
import {focusFirstDescendant} from '../../helpers'
import {useForwardedRef, useResponsiveProp} from '../../hooks'
import {
  Box,
  Button,
  ButtonProps,
  Card,
  Popover,
  PopoverProps,
  Spinner,
  Text,
  TextInput,
} from '../../primitives'
import {AutocompleteOption} from './autocompleteOption'

type OpenButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>

export interface BaseAutocompleteOption {
  value: string
}

export interface AutocompleteProps<Option extends BaseAutocompleteOption> {
  border?: boolean
  customValidity?: string
  filterOption?: (query: string, option: Option) => boolean
  fontSize?: number | number[]
  icon?: React.ComponentType | React.ReactNode
  id: string
  loading?: boolean
  onChange?: (value: string) => void
  onQueryChange?: (query: string | null) => void
  onSelect?: (value: string) => void
  /**
   * @beta
   */
  openButton?: boolean | OpenButtonProps
  options?: Option[]
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'>
  prefix?: React.ReactNode
  radius?: number | number[]
  renderOption?: (option: Option) => React.ReactElement
  renderValue?: (value: string, option?: Option) => string
  suffix?: React.ReactNode
  value?: string
}

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

const LoadingCard = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  transition: opacity 100ms;

  &:not([hidden]) {
    display: flex;
  }
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

const InnerAutocomplete = forwardRef(
  <Option extends BaseAutocompleteOption>(
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
  ) => {
    const {
      border = true,
      customValidity,
      disabled,
      filterOption: filterOptionProp,
      fontSize = 2,
      icon,
      id,
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
      radius = 2,
      renderOption: renderOptionProp,
      renderValue = defaultRenderValue,
      value: valueProp = '',
      ...restProps
    } = props

    const defaultRenderOption = useCallback(
      ({value}: BaseAutocompleteOption) => (
        <Card as="button" padding={paddingProp} tone="inherit">
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
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null)
    const activeItemId = selectedIndex > -1 ? `${id}-option-${selectedIndex}` : undefined
    const padding = useResponsiveProp(paddingProp)
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const [resultsPopoverElement, setResultsPopoverElement] = useState<HTMLDivElement | null>(null)
    const currentOption = value ? options.find((o) => o.value === value) : undefined
    const filteredOptions = useMemo(
      () => options.filter((option) => (query ? filterOption(query, option) : true)),
      [filterOption, options, query]
    )
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

    const handleRootKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          if (!optionsLen) return
          setSelectedIndex((index) => (index + 1) % optionsLen)

          return
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault()
          if (!optionsLen) return
          setSelectedIndex((index) => {
            return index === -1 ? optionsLen - 1 : (optionsLen + index - 1) % optionsLen
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
      [onQueryChange, optionsLen]
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
    useEffect(() => setSelectedIndex(-1), [optionsLen])

    // Focus the selected item
    useEffect(() => {
      const listElement = listRef.current

      if (!listElement) return

      const selectedItemElement = listElement.childNodes[selectedIndex] as HTMLLIElement | undefined

      if (selectedItemElement) {
        focusFirstDescendant(selectedItemElement)
      }
    }, [selectedIndex])

    const setRef = useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el
        forwardedRef.current = el
      },
      [forwardedRef]
    )

    const clearButton = useMemo(
      () =>
        !disabled && value.length > 0
          ? {
              'aria-label': 'Clear',
              onFocus: handleClearButtonFocus,
            }
          : undefined,
      [disabled, handleClearButtonFocus, value]
    )

    const openButtonBoxPadding = useMemo(() => padding.map((v) => v - 2), [padding])
    const openButtonPadding = useMemo(() => padding.map((v) => v - 1), [padding])
    const openButtonProps: OpenButtonProps = useMemo(
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
        openButton ? (
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
        fontSize,
        handleOpenClick,
        openButton,
        openButtonBoxPadding,
        openButtonPadding,
        openButtonProps,
      ]
    )

    return (
      <Root
        data-ui="Autocomplete"
        onBlur={handleRootBlur}
        onKeyDown={handleRootKeyDown}
        ref={setRootElement}
      >
        <ResultsPopover
          __unstable_margins={[1, 1, 1, 1]}
          arrow={false}
          constrainSize
          content={
            <ListBox paddingY={1} tabIndex={-1}>
              <ul aria-multiselectable={false} id={listboxId} ref={listRef} role="listbox">
                {filteredOptions.map((option, optionIndex) => (
                  <AutocompleteOption
                    id={`${id}-option-${optionIndex}`}
                    key={option.value}
                    onSelect={handleOptionSelect}
                    selected={
                      selectedIndex > -1 ? optionIndex === selectedIndex : currentOption === option
                    }
                    value={option.value}
                  >
                    {cloneElement(renderOption(option), {disabled: loading, tabIndex: -1})}
                  </AutocompleteOption>
                ))}
              </ul>

              <LoadingCard padding={3} style={{opacity: loading ? 0.5 : 0}}>
                <Spinner />
              </LoadingCard>
            </ListBox>
          }
          fallbackPlacements={['top-start']}
          matchReferenceWidth
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          open={expanded}
          portal
          placement="bottom-start"
          radius={radius}
          ref={setResultsPopoverElement}
          {...popover}
        >
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
            id={id}
            inputMode="search"
            onChange={handleInputChange}
            onClear={handleClearButtonClick}
            onFocus={handleInputFocus}
            padding={padding}
            prefix={prefix}
            radius={radius}
            ref={setRef}
            role="combobox"
            spellCheck={false}
            suffix={openButtonNode}
            value={query === null ? renderValue(value, currentOption) : query}
          />
        </ResultsPopover>
      </Root>
    )
  }
)

InnerAutocomplete.displayName = 'Autocomplete'

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
