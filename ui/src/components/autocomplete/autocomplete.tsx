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
import {focusFirstDescendant} from '../../helpers'
import {useForwardedRef} from '../../hooks'
import {Box, Button, Card, Spinner, Text, TextInput} from '../../primitives'
import {getResponsiveProp} from '../../styles'
import {AutocompleteOption} from './autocompleteOption'
import {Root, LoadingCard, ListBoxContainer, ListBoxCard} from './styles'

export interface BaseAutocompleteOption {
  value: string
}

export interface AutocompleteProps<Option extends BaseAutocompleteOption> {
  border?: boolean
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
  openButton?: boolean
  options?: Option[]
  padding?: number | number[]
  prefix?: React.ReactNode
  radius?: number | number[]
  renderOption?: (option: Option) => React.ReactElement
  renderValue?: (value: string, option?: Option) => string
  suffix?: React.ReactNode
  value?: string
}

type AutocompleteOverriddenInputAttrKey =
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
  | 'ref'
  | 'role'
  | 'spellCheck'
  | 'type'
  | 'value'

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
      Omit<React.HTMLProps<HTMLInputElement>, AutocompleteOverriddenInputAttrKey>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      border = true,
      filterOption: filterOptionProp,
      fontSize = 2,
      icon,
      id,
      loading,
      onChange,
      onQueryChange,
      onSelect,
      openButton,
      options: optionsProp = [],
      padding: paddingProp = 3,
      radius = 2,
      renderOption: renderOptionProp,
      renderValue = defaultRenderValue,
      value: valueProp = '',
      ...restProps
    } = props

    const defaultRenderOption = useCallback(
      ({value}: BaseAutocompleteOption) => (
        <Card as="button" padding={paddingProp} tone="inherit">
          <Text size={fontSize}>{value}</Text>
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
    const options = Array.isArray(optionsProp) ? optionsProp : []
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const listRef = useRef<HTMLUListElement | null>(null)
    const activeItemId = selectedIndex > -1 ? `${id}-option-${selectedIndex}` : undefined
    const padding = getResponsiveProp(paddingProp)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const currentOption = value ? options.find((o) => o.value === value) : undefined
    const filteredOptions = options.filter((option) => (query ? filterOption(query, option) : true))
    const optionsLen = filteredOptions.length
    const expanded = loading || (focused && optionsLen > 0 && query !== null)
    const forwardedRef = useForwardedRef(ref)

    const handleRootBlur = useCallback(() => {
      setTimeout(() => {
        const rootEl = rootRef.current
        const focusedEl = document.activeElement
        const focusInside = rootEl && focusedEl && rootEl.contains(focusedEl)

        if (!focusInside) setFocused(false)
      }, 0)
    }, [])

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
        if (onQueryChange) onQueryChange(q)
      },
      [onQueryChange]
    )

    const handleInputFocus = useCallback(() => setFocused(true), [])

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
      },
      [onChange, onSelect, onQueryChange]
    )

    const handleOpenClick = useCallback(() => {
      inputRef.current?.focus()
      setQuery(query || '')
    }, [query])

    // Change the value when `value` prop changes
    useEffect(() => {
      if (valueProp !== valueRef.current) {
        valueRef.current = valueProp
        setValue(valueProp)
      }
    }, [valueProp])

    // Reset selected item when the list changes
    // @todo: what if the list changed, but the items have changed?
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

    const setRef = (el: HTMLInputElement | null) => {
      inputRef.current = el
      forwardedRef.current = el
    }

    const clearButton = useMemo(
      () =>
        value.length > 0
          ? {
              'aria-label': 'Clear',
              onFocus: handleClearButtonFocus,
            }
          : undefined,
      [handleClearButtonFocus, value]
    )

    return (
      <Root
        data-ui="Autocomplete"
        onBlur={handleRootBlur}
        onKeyDown={handleRootKeyDown}
        ref={rootRef}
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
          icon={icon}
          id={id}
          inputMode="search"
          onChange={handleInputChange}
          onClear={handleClearButtonClick}
          onFocus={handleInputFocus}
          padding={padding}
          radius={radius}
          ref={setRef}
          role="combobox"
          fontSize={fontSize}
          spellCheck={false}
          suffix={
            openButton ? (
              <Box padding={1}>
                <Button icon={ChevronDownIcon} mode="bleed" onClick={handleOpenClick} padding={2} />
              </Box>
            ) : undefined
          }
          value={query === null ? renderValue(value, currentOption) : query}
        />

        <ListBoxContainer hidden={!expanded}>
          <ListBoxCard paddingY={1} radius={1} shadow={2} tabIndex={-1} tone="inherit">
            <ul aria-multiselectable={false} id={listboxId} ref={listRef} role="listbox">
              {filteredOptions.map((option, optionIndex) => (
                <AutocompleteOption
                  id={`${id}-option-${optionIndex}`}
                  key={optionIndex}
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
          </ListBoxCard>
        </ListBoxContainer>
      </Root>
    )
  }
)

InnerAutocomplete.displayName = 'Autocomplete'

export const Autocomplete = InnerAutocomplete as <Option extends BaseAutocompleteOption>(
  props: AutocompleteProps<Option> &
    Omit<React.HTMLProps<HTMLInputElement>, AutocompleteOverriddenInputAttrKey> & {
      ref?: React.Ref<HTMLInputElement>
    }
) => React.ReactElement
