import React, {cloneElement, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Button, TextInput} from '../../atoms'
import {focusFirstDescendant} from '../../helpers'
import {getResponsiveProp} from '../../styles'
import {Root, ListBoxContainer, ListBoxCard} from './styles'

export interface AutocompleteProps<Option extends {_key: string}> {
  border?: boolean
  id: null | string
  onInputChange?: (inputValue: string) => void
  inputValue?: string
  onSelect?: (option: Option) => void
  options: Option[]
  padding?: number | number[]
  radius?: number | number[]
  renderOption: (option: Option) => React.ReactElement
  size?: number | number[]
}

type OverriddenInputAttrKey =
  | 'aria-activedescendant'
  | 'aria-autocomplete'
  | 'aria-expanded'
  | 'aria-owns'
  | 'as'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'inputMode'
  | 'autoCorrect'
  | 'id'
  | 'onChange'
  | 'ref'
  | 'role'
  | 'spellCheck'
  | 'type'
  | 'value'

type Props<OptionType extends {_key: string}> = AutocompleteProps<OptionType> &
  Omit<React.HTMLProps<HTMLInputElement>, OverriddenInputAttrKey>

const ClearButtonBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  & > button {
    vertical-align: top;
  }
`

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

export function Autocomplete<OptionType extends {_key: string}>(props: Props<OptionType>) {
  const {
    border = true,
    id,
    onInputChange,
    onSelect,
    options: optionsProp,
    padding: paddingProp = 3,
    radius = 2,
    renderOption,
    size = 2,
    inputValue = '',
    ...restProps
  } = props

  const [focused, setFocused] = useState(false)
  const inputId = `${id}-input`
  const listboxId = `${id}-listbox`
  const options = Array.isArray(optionsProp) ? optionsProp : []
  const optionsLen = options.length
  const expanded = focused && optionsLen > 0
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const activeItemId = selectedIndex ? `${id}-option-${selectedIndex}` : undefined
  // const activeValue = (selectedIndex && options[selectedIndex]?.value) || null
  const padding = getResponsiveProp(paddingProp)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const handleRootBlur = useCallback(() => {
    setTimeout(() => {
      const rootEl = rootRef.current
      const focusedEl = document.activeElement
      const focusInside = rootEl && focusedEl && rootEl.contains(focusedEl)

      if (!focusInside) {
        // hide listbox
        setFocused(false)
      }
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

        inputRef.current?.focus()

        return
      }

      const target = event.target as Node
      const listEl = listRef.current

      // console.log(listEl?.contains(target))

      if (
        (listEl === target || listEl?.contains(target)) &&
        !LIST_IGNORE_KEYS.includes(event.key)
      ) {
        inputRef.current?.focus()

        return
      }
    },
    [onInputChange, optionsLen]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) onInputChange(event.currentTarget.value)
    },
    [onInputChange]
  )

  const handleInputFocus = useCallback(() => setFocused(true), [])

  const handleClearButtonClick = useCallback(() => {
    if (onInputChange) onInputChange('')
    inputRef.current?.focus()
  }, [onInputChange])

  const handleClearButtonFocus = useCallback(() => setFocused(true), [])

  const handleOptionSelect = useCallback(
    (v: OptionType) => {
      if (onSelect) onSelect(v)
      setFocused(false)
    },
    [onSelect]
  )

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

  return (
    <Root onBlur={handleRootBlur} onKeyDown={handleRootKeyDown} ref={rootRef}>
      <TextInput
        {...restProps}
        inputMode="search"
        aria-activedescendant={activeItemId}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-owns={listboxId}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        border={border}
        icon="search"
        id={inputId}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        padding={padding}
        radius={radius}
        ref={inputRef}
        role="combobox"
        size={size}
        spellCheck={false}
        value={inputValue}
      />

      {inputValue?.length > 0 && (
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

      <ListBoxContainer hidden={!expanded} onInput={console.log}>
        <ListBoxCard paddingY={1} radius={1} shadow={2}>
          <ul aria-multiselectable={false} id={listboxId} ref={listRef} role="listbox">
            {options.map((option, optionIndex) => (
              <AutosuggestOption
                id={`${id}-option-${optionIndex}`}
                key={optionIndex}
                onSelect={handleOptionSelect}
                selected={optionIndex === selectedIndex}
                value={option}
              >
                {cloneElement(renderOption(option), {tabIndex: -1})}
              </AutosuggestOption>
            ))}
          </ul>
        </ListBoxCard>
      </ListBoxContainer>
    </Root>
  )
}

function AutosuggestOption<T extends {_key: string}>(props: {
  children: React.ReactNode
  id: string
  onSelect: (v: T) => void
  selected: boolean
  value: T
}) {
  const {children, id, onSelect, selected, value} = props

  const handleClick = useCallback(() => {
    onSelect(value)
  }, [onSelect, value])

  return (
    <li aria-selected={selected} id={id} role="presentation" onClick={handleClick}>
      {children}
    </li>
  )
}
