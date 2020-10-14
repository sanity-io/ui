import {SearchIcon} from '@sanity/icons'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Button, Text, TextInput, useCard} from '../../atoms'
import {focusFirstDescendant} from '../../helpers'
import {Root, SearchField, ListBoxContainer, ListBoxCard} from './styles'

export interface AutocompleteOption {
  value: string
}

export interface AutocompleteProps {
  id: string
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  options: AutocompleteOption[]
  renderOption: (option: AutocompleteOption) => React.ReactNode
  value?: string
}

type Props = AutocompleteProps &
  Omit<
    React.HTMLProps<HTMLInputElement>,
    'as' | 'autoComplete' | 'autoComplete' | 'id' | 'onChange' | 'ref' | 'type' | 'value'
  >

const SearchIconBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

const ClearButtonBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  & > button {
    vertical-align: top;
  }
`

export function Autocomplete(props: Props) {
  const {id, onChange, onSelect, options, renderOption, value: valueProp = '', ...restProps} = props
  const card = useCard()
  const [value, setValue] = useState(valueProp)
  const valueRef = useRef(value)
  const [focused, setFocused] = useState(false)
  const [listHovered, setListHovered] = useState(false)
  const inputId = `${id}-input`
  const listboxId = `${id}-listbox`
  const optionsLen = options.length
  const expanded = focused && optionsLen > 0
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const listRef = useRef<HTMLUListElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const activeItemId = selectedIndex ? `${id}-option-${selectedIndex}` : undefined
  // const activeValue = (selectedIndex && options[selectedIndex]?.value) || null

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      valueRef.current = event.currentTarget.value
      setValue(event.currentTarget.value)
      if (onChange) onChange(event.currentTarget.value)
    },
    [onChange]
  )

  const handleClearButtonClick = useCallback(() => {
    valueRef.current = ''
    setValue('')
    if (onChange) onChange('')
  }, [onChange])

  const handleInputFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    if (!listHovered) setFocused(false)
  }, [listHovered])

  useEffect(() => {
    if (valueProp !== valueRef.current) {
      valueRef.current = valueProp
      setValue(valueProp)
    }
  }, [valueProp])

  const handleListMouseEnter = useCallback(() => {
    setListHovered(true)
  }, [])

  const handleListMouseLeave = useCallback(() => {
    setListHovered(false)
  }, [])

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (!optionsLen) return
        setListHovered(true)
        setSelectedIndex((index) => {
          return (index + 1) % optionsLen
        })
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (!optionsLen) return
        setListHovered(true)
        setSelectedIndex((index) => {
          return index === -1 ? optionsLen - 1 : (optionsLen + index - 1) % optionsLen
        })
        return
      }

      if (event.key === 'Enter') {
        return
      }

      inputRef.current?.focus()
    },
    [optionsLen]
  )

  const handleSelect = useCallback(
    (v: string) => {
      if (onSelect) onSelect(v)
      if (onChange) onChange('')
      setFocused(false)
    },
    [onChange, onSelect]
  )

  useEffect(() => setSelectedIndex(-1), [optionsLen])

  useEffect(() => {
    const listElement = listRef.current

    if (!listElement) return

    const selectedItemElement = listElement.childNodes[selectedIndex] as HTMLLIElement | undefined

    if (selectedItemElement) {
      const result = focusFirstDescendant(selectedItemElement)

      if (!result) {
        console.log('could not focus', selectedItemElement)
      }
    }
  }, [selectedIndex])

  return (
    <Root onKeyDown={handleInputKeyDown}>
      <SearchField radius={2} scheme={card.scheme} shadow={1}>
        <TextInput
          {...restProps}
          aria-activedescendant={activeItemId}
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-owns={listboxId}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          id={inputId}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          paddingX={5}
          paddingY={3}
          ref={inputRef}
          role="combobox"
          spellCheck={false}
          value={value}
        />

        <SearchIconBox margin={3}>
          <Text>
            <SearchIcon aria-hidden="true" focusable={false} />
          </Text>
        </SearchIconBox>

        {value.length > 0 && (
          <ClearButtonBox margin={2}>
            <Button
              aria-label="Clear"
              icon="close"
              mode="bleed"
              onClick={handleClearButtonClick}
              padding={1}
            />
          </ClearButtonBox>
        )}
      </SearchField>

      <ListBoxContainer
        hidden={!expanded}
        onMouseEnter={handleListMouseEnter}
        onMouseLeave={handleListMouseLeave}
      >
        <ListBoxCard paddingY={1} radius={1} shadow={2}>
          <ul aria-multiselectable={false} id={listboxId} ref={listRef} role="listbox">
            {options.map((option, optionIndex) => (
              <AutosuggestOption
                id={`${id}-option-${optionIndex}`}
                key={option.value}
                onSelect={handleSelect}
                selected={optionIndex === selectedIndex}
                value={option.value}
              >
                {renderOption(option)}
              </AutosuggestOption>
            ))}
          </ul>
        </ListBoxCard>
      </ListBoxContainer>
    </Root>
  )
}

function AutosuggestOption(props: {
  children: React.ReactNode
  id: string
  onSelect: (v: string) => void
  selected: boolean
  value: string
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
