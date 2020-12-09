import React, {cloneElement, forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Button, Card, Spinner, Text, TextInput} from '../../atoms'
import {focusFirstDescendant} from '../../helpers'
import {useForwardedRef} from '../../hooks'
import {getResponsiveProp} from '../../styles'
import {AutocompleteOption} from './autocompleteOption'
import {Root, LoadingCard, ListBoxContainer, ListBoxCard} from './styles'

export interface BaseAutocompleteOption {
  value: string
}

export interface AutocompleteProps<Option extends BaseAutocompleteOption> {
  border?: boolean
  filterOption?: (query: string, option: Option) => boolean
  icon?: React.ComponentType | React.ReactNode
  id: string
  loading?: boolean
  onChange?: (value: string) => void
  onQueryChange?: (query: string | null) => void
  onSelect?: (value: string) => void
  options?: Option[]
  padding?: number | number[]
  prefix?: React.ReactNode
  radius?: number | number[]
  renderOption?: (option: Option) => React.ReactElement
  renderValue?: (value: string, option?: Option) => string
  size?: number | number[]
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

const ClearButtonBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  & > button {
    vertical-align: top;
  }
`

const defaultRenderOption = ({value}: BaseAutocompleteOption) => (
  <Card as="button" padding={3}>
    <Text>{value}</Text>
  </Card>
)

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
      icon,
      id,
      loading,
      onChange,
      onQueryChange,
      onSelect,
      options: optionsProp = [],
      padding: paddingProp = 3,
      radius = 2,
      renderOption: renderOptionProp,
      renderValue = defaultRenderValue,
      size = 2,
      value: valueProp = '',
      ...restProps
    } = props
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
          icon={icon}
          id={id}
          inputMode="search"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          padding={padding}
          radius={radius}
          ref={setRef}
          role="combobox"
          size={size}
          spellCheck={false}
          value={query === null ? renderValue(value, currentOption) : query}
        />

        {value.length > 0 && (
          <ClearButtonBox margin={padding.map((v) => v - 1)} onFocus={handleClearButtonFocus}>
            <Button
              aria-label="Clear"
              data-qa="clear-button"
              icon="close"
              mode="bleed"
              onClick={handleClearButtonClick}
              padding={padding.map((v) => v - 2)}
              size={size}
            />
          </ClearButtonBox>
        )}

        <ListBoxContainer hidden={!expanded}>
          <ListBoxCard paddingY={1} radius={1} shadow={2} tabIndex={-1}>
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
