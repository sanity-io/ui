import {ChevronDownIcon} from '@sanity/icons'
import type {ResponsiveProp} from '@sanity/ui/css'
import type {Radius, Space} from '@sanity/ui/theme'
import {
  type ChangeEvent,
  cloneElement,
  type ElementType,
  type FocusEvent,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react'

import {EMPTY_ARRAY, EMPTY_RECORD} from '../../core/constants'
import {_raf} from '../../core/helpers/animation'
import {_hasFocus, focusFirstDescendant} from '../../core/helpers/focus'
import {_getResponsiveProp} from '../../core/helpers/props'
import type {ComponentType, Props} from '../../core/types'
import {Box, type BoxOwnProps} from '../../primitives/box/Box'
import {Button} from '../../primitives/button/Button'
import {Popover, type PopoverProps} from '../../primitives/popover/Popover'
import {Selectable} from '../../primitives/selectable/Selectable'
import {AnimatedSpinnerIcon} from '../../primitives/spinner/AnimatedSpinnerIcon'
import {Stack} from '../../primitives/stack/Stack'
import {Text} from '../../primitives/text/Text'
import {TextInput, type TextInputOwnProps} from '../../primitives/textInput/TextInput'
import {AutocompleteOption} from './AutocompleteOption'
import {autocompleteReducer} from './autocompleteReducer'
import {
  AUTOCOMPLETE_LISTBOX_IGNORE_KEYS,
  AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS,
  AUTOCOMPLETE_POPOVER_PLACEMENT,
} from './constants'
import type {AutocompleteOpenButtonProps, BaseAutocompleteOption} from './types'

/** @public */
export const DEFAULT_AUTOCOMPLETE_ELEMENT = 'input'

/** @public */
export type AutocompleteOwnProps<Option extends BaseAutocompleteOption = BaseAutocompleteOption> =
  TextInputOwnProps & {
    border?: boolean
    customValidity?: string
    filterOption?: (query: string, option: Option) => boolean
    icon?: ElementType | ReactNode
    /** @beta */
    listBox?: BoxOwnProps
    loading?: boolean
    onChange?: (value: string) => void
    onQueryChange?: (query: string | null) => void
    onSelect?: (value: string) => void
    /** @beta */
    openButton?: boolean | AutocompleteOpenButtonProps
    /** @beta */
    openOnFocus?: boolean
    /** The options to render. */
    options?: Option[]
    padding?: ResponsiveProp<Space>
    popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'>
    prefix?: ReactNode
    radius?: Radius | Radius[]
    /** @beta */
    relatedElements?: HTMLElement[]
    /** The callback function for rendering each option. */
    renderOption?: (option: Option) => React.JSX.Element
    /** @beta */
    renderPopover?: (
      props: {
        content: React.JSX.Element | null
        hidden: boolean
        inputElement: HTMLInputElement | null
        onMouseEnter: () => void
        onMouseLeave: () => void
      },
      ref: ForwardedRef<HTMLDivElement>,
    ) => ReactNode
    renderValue?: (value: string, option?: Option) => string
    suffix?: ReactNode
    value?: string
  }

/** @public */
export type AutocompleteElementType = 'input' | ComponentType

/** @public */
export type AutocompleteProps<
  E extends AutocompleteElementType = AutocompleteElementType,
  Option extends BaseAutocompleteOption = BaseAutocompleteOption,
> = Props<AutocompleteOwnProps<Option>, E>

const DEFAULT_RENDER_VALUE = (value: string, option?: BaseAutocompleteOption) =>
  option ? option.value : value

const DEFAULT_FILTER_OPTION = (query: string, option: BaseAutocompleteOption) =>
  option.value.toLowerCase().indexOf(query.toLowerCase()) > -1

/**
 * The Autocomplete component is typically used for search components.
 * It consists of a text input for writing a query, and properties for rendering suggestions.
 *
 * @public
 */
export function Autocomplete<
  E extends AutocompleteElementType = typeof DEFAULT_AUTOCOMPLETE_ELEMENT,
  Option extends BaseAutocompleteOption = BaseAutocompleteOption,
>(props: AutocompleteProps<E, Option>): React.JSX.Element {
  const {
    as = DEFAULT_AUTOCOMPLETE_ELEMENT,
    border,
    customValidity,
    disabled,
    filterOption: filterOptionProp,
    flex,
    fontSize,
    icon,
    id,
    listBox = EMPTY_RECORD,
    loading,
    onBlur,
    onChange,
    onFocus,
    onQueryChange,
    onSelect,
    openButton,
    openOnFocus,
    options: optionsProp,
    padding: paddingProp = 3,
    popover = EMPTY_RECORD,
    prefix,
    radius: radiusProp = 3,
    readOnly,
    ref: forwardedRef,
    relatedElements,
    renderOption: renderOptionProp,
    renderPopover,
    renderValue = DEFAULT_RENDER_VALUE,
    suffix,
    value: valueProp,
    ...rest
  } = props as AutocompleteProps<typeof DEFAULT_AUTOCOMPLETE_ELEMENT, Option>

  const [state, dispatch] = useReducer(autocompleteReducer, {
    activeValue: valueProp || null,
    focused: false,
    listFocused: false,
    query: null,
    value: valueProp || null,
  })

  const {activeValue, focused, listFocused, query, value} = state

  const radius = _getResponsiveProp(radiusProp)

  const innerRadius = _getResponsiveProp(
    radius.map((r): Radius => {
      if (r === undefined || r === 'full') return 'full'
      return (r - 1) as Radius
    }) as ResponsiveProp<Radius>,
  )

  const defaultRenderOption = ({value}: BaseAutocompleteOption) => (
    <Selectable as="button" padding={paddingProp} radius={innerRadius}>
      <Text size={fontSize} textOverflow="ellipsis">
        {value}
      </Text>
    </Selectable>
  )

  const renderOption =
    typeof renderOptionProp === 'function' ? renderOptionProp : defaultRenderOption

  const filterOption =
    typeof filterOptionProp === 'function' ? filterOptionProp : DEFAULT_FILTER_OPTION

  // Element refs
  const rootElementRef = useRef<HTMLDivElement | null>(null)
  const resultsPopoverElementRef = useRef<HTMLDivElement | null>(null)
  const inputElementRef = useRef<HTMLInputElement | null>(null)
  const listBoxElementRef = useRef<HTMLUListElement | null>(null)

  // Element refs that need to be accessed during render
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null)

  // Value refs
  const listFocusedRef = useRef(false)
  const valueRef = useRef(value)
  const valuePropRef = useRef(valueProp)
  const popoverMouseWithinRef = useRef(false)

  // Forward inputElement state to inputElementRef
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    inputElementRef,
    () => inputElement,
    [inputElement],
  )
  // Forward inputElement to parent
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => inputElement,
    [inputElement],
  )

  const listBoxId = `${id}-listbox`
  const options = Array.isArray(optionsProp) ? optionsProp : EMPTY_ARRAY
  const padding = _getResponsiveProp(paddingProp)
  const currentOption = value !== null ? options.find((o) => o.value === value) : undefined
  const filteredOptions = options.filter((option) => (query ? filterOption(query, option) : true))
  const filteredOptionsLen = filteredOptions.length
  const activeItemId = activeValue ? `${id}-option-${activeValue}` : undefined
  const expanded = (query !== null && loading) || (focused && query !== null)

  const handleRootBlur = (event: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      // NOTE: This is a workaround for a bug that may happen in Chrome (clicking the scrollbar
      // closes the results in certain situations):
      // - Do not handle blur if the mouse is within the popover
      if (popoverMouseWithinRef.current) {
        return
      }

      const elements: HTMLElement[] = (relatedElements || []).concat(
        rootElementRef.current ? [rootElementRef.current] : [],
        resultsPopoverElementRef.current ? [resultsPopoverElementRef.current] : [],
      )

      let focusInside = false

      if (document.activeElement) {
        for (const e of elements) {
          if (e === document.activeElement || e.contains(document.activeElement)) {
            focusInside = true
            break
          }
        }
      }

      if (focusInside === false) {
        dispatch({type: 'root/blur'})
        popoverMouseWithinRef.current = false
        if (onQueryChange) onQueryChange(null)
        if (onBlur) onBlur(event)
      }
    }, 0)
  }

  const handleRootFocus = (event: FocusEvent<HTMLDivElement>) => {
    const listBoxElement = listBoxElementRef.current
    const focusedElement = event.target instanceof HTMLElement ? event.target : null
    const listFocused = listBoxElement?.contains(focusedElement) || false

    if (listFocused !== listFocusedRef.current) {
      listFocusedRef.current = listFocused

      dispatch({type: 'root/setListFocused', listFocused})
    }
  }

  const handleOptionSelect = (v: string) => {
    dispatch({type: 'value/change', value: v})

    popoverMouseWithinRef.current = false

    if (onSelect) onSelect(v)

    valueRef.current = v

    if (onChange) onChange(v)
    if (onQueryChange) onQueryChange(null)

    inputElementRef.current?.focus()
  }

  const handleRootKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()

      if (!filteredOptionsLen) return

      const activeOption = filteredOptions.find((o) => o.value === activeValue)
      const activeIndex = activeOption ? filteredOptions.indexOf(activeOption) : -1
      const nextActiveOption = filteredOptions[(activeIndex + 1) % filteredOptionsLen]

      if (nextActiveOption) {
        dispatch({type: 'root/setActiveValue', value: nextActiveOption.value, listFocused: true})
      }

      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()

      if (!filteredOptionsLen) return

      const activeOption = filteredOptions.find((o) => o.value === activeValue)
      const activeIndex = activeOption ? filteredOptions.indexOf(activeOption) : -1
      const nextActiveOption =
        filteredOptions[
          activeIndex === -1
            ? filteredOptionsLen - 1
            : (filteredOptionsLen + activeIndex - 1) % filteredOptionsLen
        ]

      if (nextActiveOption) {
        dispatch({type: 'root/setActiveValue', value: nextActiveOption.value, listFocused: true})
      }

      return
    }

    if (event.key === 'Escape') {
      dispatch({type: 'root/escape'})
      popoverMouseWithinRef.current = false
      if (onQueryChange) onQueryChange(null)
      inputElementRef.current?.focus()

      return
    }

    const target = event.target as Node
    const listEl = listBoxElementRef.current

    if (
      (listEl === target || listEl?.contains(target)) &&
      !AUTOCOMPLETE_LISTBOX_IGNORE_KEYS.includes(event.key)
    ) {
      inputElementRef.current?.focus()

      return
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.currentTarget.value

    dispatch({type: 'input/change', query: nextQuery})

    if (onQueryChange) onQueryChange(nextQuery)
  }

  const dispatchOpen = () => {
    dispatch({
      type: 'root/open',
      query: value ? renderValue(value, currentOption) : '',
    })
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!focused) {
      dispatch({type: 'input/focus'})

      if (onFocus) onFocus(event)
      if (openOnFocus) dispatchOpen()
    }
  }

  const handlePopoverMouseEnter = () => {
    popoverMouseWithinRef.current = true
  }

  const handlePopoverMouseLeave = () => {
    popoverMouseWithinRef.current = false
  }

  const handleClearButtonClick = () => {
    dispatch({type: 'root/clear'})
    valueRef.current = ''
    if (onChange) onChange('')
    if (onQueryChange) onQueryChange(null)
    inputElementRef.current?.focus()
  }

  const handleClearButtonFocus = () => {
    dispatch({type: 'input/focus'})
  }

  // Change the value when `value` prop changes
  useEffect(() => {
    // If `valueProp` changed
    if (valueProp !== valuePropRef.current) {
      valuePropRef.current = valueProp

      if (valueProp !== undefined) {
        dispatch({type: 'value/change', value: valueProp})
        valueRef.current = valueProp
      }

      return
    }

    // If `valueProp` is not equal to `value`
    if (valueProp !== valueRef.current) {
      valueRef.current = valueProp || null

      dispatch({type: 'value/change', value: valueProp || null})
    }
  }, [valueProp])

  // Reset active item when closing
  useEffect(() => {
    if (!focused && valueRef.current) {
      dispatch({type: 'root/setActiveValue', value: valueRef.current})
    }
  }, [focused])

  // Focus the selected item
  useEffect(() => {
    const listElement = listBoxElementRef.current

    if (!listElement) return

    const activeOption = filteredOptions.find((o) => o.value === activeValue)

    if (activeOption) {
      const activeIndex = filteredOptions.indexOf(activeOption)
      const activeItemElement = listElement.childNodes[activeIndex] as HTMLLIElement | undefined

      if (activeItemElement) {
        if (_hasFocus(activeItemElement)) {
          // already focused
          return
        }

        focusFirstDescendant(activeItemElement)
      }
    }
  }, [activeValue, filteredOptions])

  const clearButton = (() => {
    if (!loading && !disabled && value) {
      return {
        'aria-label': 'Clear',
        'onFocus': handleClearButtonFocus,
      }
    }

    return undefined
  })()

  const openButtonBoxPadding = padding.map((p) => {
    if (p === undefined) return 0
    if (p === 0) return 0
    if (p === 1) return 1
    if (p === 2) return 1

    return p - 2
  }) as ResponsiveProp<Space>

  const openButtonPadding = padding.map((v) =>
    v === undefined ? undefined : (Math.max(v - 1, 0) as Space),
  ) as ResponsiveProp<Space>

  const openButtonProps: AutocompleteOpenButtonProps =
    typeof openButton === 'object' ? openButton : EMPTY_RECORD

  const handleOpenClick = (event: MouseEvent<HTMLButtonElement>) => {
    dispatchOpen()

    if (openButtonProps['onClick']) openButtonProps['onClick'](event)

    _raf(() => inputElementRef.current?.focus())
  }

  const openButtonNode = (() => {
    if (disabled) return undefined
    if (readOnly) return undefined
    if (!openButton) return undefined

    return (
      <Box aria-hidden={expanded} padding={openButtonBoxPadding}>
        <Button
          aria-label="Open"
          fontSize={fontSize}
          icon={ChevronDownIcon}
          mode="bleed"
          padding={openButtonPadding}
          radius={innerRadius}
          selected={expanded}
          {...openButtonProps}
          onClick={handleOpenClick}
        />
      </Box>
    )
  })()

  const inputValue = (() => {
    if (query === null) {
      if (value !== null) {
        return renderValue(value, currentOption)
      }

      return ''
    }

    return query
  })()

  const handleListBoxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // If the focus is currently in the list, move focus to the input element
    if (event.key === 'Tab') {
      if (listFocused) {
        inputElementRef.current?.focus()
        event.preventDefault()
      }
    }
  }

  const content = (() => {
    if (filteredOptions.length === 0) return null

    return (
      <Box data-ui="AutoComplete__results" onKeyDown={handleListBoxKeyDown} {...listBox}>
        <Stack
          ref={listBoxElementRef}
          aria-multiselectable={false}
          as="ul"
          data-ui="AutoComplete__resultsList"
          gap={1}
          id={listBoxId}
          padding={1}
          role="listbox"
        >
          {filteredOptions.map((option) => {
            const active =
              activeValue !== null ? option.value === activeValue : currentOption === option

            return (
              <AutocompleteOption
                key={option.value}
                id={`${id}-option-${option.value}`}
                selected={active}
                value={option.value}
                onSelect={handleOptionSelect}
              >
                {cloneElement(renderOption(option), {
                  disabled: loading,
                  selected: active,
                  tabIndex: listFocused && active ? 0 : -1,
                })}
              </AutocompleteOption>
            )
          })}
        </Stack>
      </Box>
    )
  })()

  const results = (() => {
    if (renderPopover) {
      return (
        <RenderPopover
          content={content}
          hidden={!expanded}
          inputElement={inputElement}
          renderPopover={renderPopover}
          resultsPopoverElementRef={resultsPopoverElementRef}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        />
      )
    }

    if (filteredOptionsLen === 0) {
      return null
    }

    return (
      <Popover
        ref={resultsPopoverElementRef}
        arrow={false}
        constrainSize
        content={content}
        fallbackPlacements={AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS}
        matchReferenceWidth
        open={expanded}
        overflow="auto"
        placement={AUTOCOMPLETE_POPOVER_PLACEMENT}
        portal
        radius={radius}
        referenceElement={inputElement}
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        {...popover}
      />
    )
  })()

  return (
    <Box
      ref={rootElementRef}
      data-ui="Autocomplete"
      flex={1}
      onBlur={handleRootBlur}
      onFocus={handleRootFocus}
      onKeyDown={handleRootKeyDown}
    >
      <TextInput
        {...rest}
        ref={setInputElement}
        aria-activedescendant={activeItemId}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-owns={listBoxId}
        as={as}
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
        padding={padding}
        prefix={prefix}
        radius={radius}
        readOnly={readOnly}
        role="combobox"
        spellCheck={false}
        suffix={suffix || openButtonNode}
        value={inputValue}
        onChange={handleInputChange}
        onClear={handleClearButtonClick}
        onFocus={handleInputFocus}
      />
      {results}
    </Box>
  )
}

function RenderPopover({
  renderPopover,
  content,
  hidden,
  inputElement,
  onMouseEnter,
  onMouseLeave,
  resultsPopoverElementRef,
}: {
  renderPopover: Exclude<AutocompleteProps['renderPopover'], undefined>
  resultsPopoverElementRef: Parameters<Exclude<AutocompleteProps['renderPopover'], undefined>>[1]
} & Parameters<Exclude<AutocompleteProps['renderPopover'], undefined>>[0]) {
  return renderPopover(
    {
      content,
      hidden,
      inputElement,
      onMouseEnter,
      onMouseLeave,
    },
    resultsPopoverElementRef,
  )
}
