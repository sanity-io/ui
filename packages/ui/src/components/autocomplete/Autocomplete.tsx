import {ChevronDownIcon} from '@sanity/icons'
import {
  _getResponsiveProp,
  _hasFocus,
  _raf,
  type ComponentType,
  EMPTY_ARRAY,
  EMPTY_RECORD,
  focusFirstDescendant,
  type Props,
} from '@sanity/ui/core'
import type {ResponsiveProp} from '@sanity/ui/css'
import {Box, type BoxOwnProps} from '@sanity/ui/primitives/box'
import {Button} from '@sanity/ui/primitives/button'
import {Popover, type PopoverProps} from '@sanity/ui/primitives/popover'
import {Selectable} from '@sanity/ui/primitives/selectable'
import {SpinnerAnimatedIcon} from '@sanity/ui/primitives/spinner'
import {Stack} from '@sanity/ui/primitives/stack'
import {Text} from '@sanity/ui/primitives/text'
import {TextInput, type TextInputOwnProps} from '@sanity/ui/primitives/text-input'
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

import {AutocompleteOption} from './AutocompleteOption'
import {autocompleteReducer} from './autocompleteReducer'
import {
  AUTOCOMPLETE_LISTBOX_IGNORE_KEYS,
  AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS,
  AUTOCOMPLETE_POPOVER_PLACEMENT,
} from './constants'
import type {AutocompleteOpenButtonProps, BaseAutocompleteOption} from './types'

/**
 * The default HTML element type rendered by the {@link Autocomplete} component.
 *
 * @public
 */
export const DEFAULT_AUTOCOMPLETE_ELEMENT = 'input'

/**
 * Own props for the {@link Autocomplete} component.
 *
 * @remarks
 * Extends {@link TextInputOwnProps} to inherit all text input styling and
 * interactive props, and adds autocomplete-specific behavior for filtering,
 * rendering, and selecting options.
 *
 * @typeParam Option - The shape of each option object. Defaults to {@link BaseAutocompleteOption}.
 *
 * @public
 */
export type AutocompleteOwnProps<Option extends BaseAutocompleteOption = BaseAutocompleteOption> =
  TextInputOwnProps & {
    /**
     * When `true`, renders a border around the input.
     */
    border?: boolean

    /**
     * Sets a custom validation message on the underlying input element.
     *
     * @remarks
     * When set to a non-empty string, the input is marked as invalid
     * and the provided message is used as the validation message.
     */
    customValidity?: string

    /**
     * A function to filter options based on the current query string.
     *
     * @remarks
     * Called for each option when the query changes. Return `true` to include
     * the option in the filtered results.
     */
    filterOption?: (query: string, option: Option) => boolean

    /**
     * An icon to render on the leading (left) side of the input.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    icon?: ElementType | ReactNode

    /**
     * Props to pass to the listbox container.
     *
     * @beta
     */
    listBox?: BoxOwnProps

    /**
     * When `true`, displays a loading spinner inside the results popover.
     */
    loading?: boolean

    /**
     * A callback that fires when the selected value changes.
     */
    onChange?: (value: string) => void

    /**
     * A callback that fires when the search query changes.
     *
     * @remarks
     * Called with the new query string, or `null` when the query is cleared.
     */
    onQueryChange?: (query: string | null) => void

    /**
     * A callback that fires when an option is selected from the list.
     */
    onSelect?: (value: string) => void

    /**
     * Enables an open button inside the input that toggles the options popover.
     * When `true`, renders a default open button. When an object is provided,
     * it is spread as props onto the open button.
     *
     * @beta
     */
    openButton?: boolean | AutocompleteOpenButtonProps

    /**
     * When `true`, opens the options popover when the input receives focus.
     *
     * @beta
     */
    openOnFocus?: boolean

    /**
     * The options to render in the autocomplete dropdown.
     */
    options?: Option[]

    /**
     * The padding inside the input. Supports responsive values.
     */
    padding?: ResponsiveProp<Space>

    /**
     * Props to pass to the {@link Popover} that wraps the options list.
     *
     * @remarks
     * The `content`, `onMouseEnter`, `onMouseLeave`, and `open` props are
     * managed internally and cannot be overridden.
     */
    popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'>

    /**
     * Content to render before the input element, outside the input's
     * styled boundary.
     */
    prefix?: ReactNode

    /**
     * The border radius of the input. Supports responsive values.
     */
    radius?: Radius | Radius[]

    /**
     * Additional elements that are considered "inside" the autocomplete for
     * focus management purposes.
     *
     * @beta
     */
    relatedElements?: HTMLElement[]

    /**
     * A render function for each option in the dropdown list.
     */
    renderOption?: (option: Option) => React.JSX.Element

    /**
     * A render function for customizing the popover container.
     *
     * @beta
     */
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

    /**
     * A function that returns the display string for a selected value.
     *
     * @remarks
     * Called with the current value and the matching option (if found).
     * Defaults to returning the option's `value` property.
     */
    renderValue?: (value: string, option?: Option) => string

    /**
     * Content to render after the input element, outside the input's
     * styled boundary.
     */
    suffix?: ReactNode

    /**
     * The currently selected value.
     */
    value?: string
  }

/**
 * Accepted values for the `as` prop of the {@link Autocomplete} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Autocomplete`.
 *
 * @public
 */
export type AutocompleteElementType = 'input' | ComponentType

/**
 * Props for the {@link Autocomplete} component.
 *
 * @remarks
 * Combines {@link AutocompleteOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link AutocompleteElementType}.
 * @typeParam O - The shape of each option object. Defaults to {@link BaseAutocompleteOption}.
 *
 * @public
 */
export type AutocompleteProps<
  E extends AutocompleteElementType = AutocompleteElementType,
  Option extends BaseAutocompleteOption = BaseAutocompleteOption,
> = Props<AutocompleteOwnProps<Option>, E>

const DEFAULT_RENDER_VALUE = (value: string, option?: BaseAutocompleteOption) =>
  option ? option.value : value

const DEFAULT_FILTER_OPTION = (query: string, option: BaseAutocompleteOption) =>
  option.value.toLowerCase().indexOf(query.toLowerCase()) > -1

/**
 * The `Autocomplete` component provides a text input with a filterable dropdown
 * of suggestions, typically used for search and selection interfaces.
 *
 * @remarks
 * `Autocomplete` combines a {@link TextInput} with a {@link Popover} containing
 * a listbox of options. It supports filtering, keyboard navigation (ArrowUp,
 * ArrowDown, Enter, Escape), custom option rendering, and loading states.
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
    fontSize = 2,
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

  const radius = _getResponsiveProp(radiusProp)

  const [state, dispatch] = useReducer(autocompleteReducer, {
    activeValue: valueProp || null,
    focused: false,
    listFocused: false,
    query: null,
    value: valueProp || null,
  })

  const {activeValue, focused, listFocused, query, value} = state

  const innerRadius = _getResponsiveProp(
    radius.map((r): Radius => {
      if (r === undefined || r === 'full') return 'full'
      if (r === 0) return 0
      if (r === 1) return 1
      if (r === 2) return 1
      if (r === 3) return 2
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

  const openButtonPadding = Object.values(padding).map((v) =>
    Math.max((v as Space) - 1, 0),
  ) as ResponsiveProp<Space>

  const openButtonProps: AutocompleteOpenButtonProps =
    typeof openButton === 'object' ? openButton : EMPTY_RECORD

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

  const handleOpenClick = (event: MouseEvent<HTMLButtonElement>) => {
    dispatchOpen()

    if (openButtonProps.onClick) openButtonProps.onClick(event)

    _raf(() => inputElementRef.current?.focus())
  }

  const handleListBoxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // If the focus is currently in the list, move focus to the input element
    if (event.key === 'Tab') {
      if (listFocused) {
        inputElementRef.current?.focus()
        event.preventDefault()
      }
    }
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
        iconRight={loading && SpinnerAnimatedIcon}
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
