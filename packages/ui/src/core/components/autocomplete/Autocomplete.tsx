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
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'

import {EMPTY_ARRAY, EMPTY_RECORD} from '../../constants'
import {_raf} from '../../helpers/animation'
import {_hasFocus, focusFirstDescendant} from '../../helpers/focus'
import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import {Box, type BoxOwnProps} from '../../primitives/box/Box'
import {Button} from '../../primitives/button/Button'
import {Popover, type PopoverProps} from '../../primitives/popover/Popover'
import {Selectable} from '../../primitives/selectable/Selectable'
import {AnimatedSpinnerIcon} from '../../primitives/spinner/AnimatedSpinnerIcon'
import {Stack} from '../../primitives/stack/Stack'
import {Text} from '../../primitives/text/Text'
import {TextInput, type TextInputOwnProps} from '../../primitives/textInput/TextInput'
import type {ComponentType, Props} from '../../types'
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
 * Extends {@link TextInputOwnProps} to inherit all single-line text input
 * capabilities (border, fontSize, gap, padding, radius, width, icon, iconRight,
 * prefix, suffix, clearButton, customValidity, weight, etc.) and adds
 * autocomplete-specific properties for option rendering, filtering, querying,
 * and popover behavior.
 *
 * @typeParam O - The shape of each option object. Must extend {@link BaseAutocompleteOption}.
 *
 * @public
 */
export type AutocompleteOwnProps<O extends BaseAutocompleteOption = BaseAutocompleteOption> =
  TextInputOwnProps & {
    /**
     * When `true`, renders a visible border around the input element.
     *
     * @defaultValue true
     */
    border?: boolean

    /**
     * Sets a custom validation message on the input element.
     *
     * @remarks
     * When a non-empty string is provided, the input is marked as invalid via
     * the Constraint Validation API (`setCustomValidity`), and the `data-invalid`
     * attribute is applied to the wrapper for styling purposes.
     *
     * Set to an empty string `""` or `undefined` to clear the validation error.
     */
    customValidity?: string

    /**
     * A function used to filter options based on the current query string.
     *
     * @remarks
     * Called for each option whenever the query changes. Return `true` to include
     * the option in the filtered results, or `false` to exclude it.
     *
     * When not provided, a default case-insensitive substring match on
     * `option.value` is used.
     *
     * @defaultValue (case-insensitive substring match on `option.value`)
     */
    filterOption?: (query: string, option: O) => boolean

    /**
     * An icon to render on the leading (left) side of the input.
     *
     * @remarks
     * Accepts either a React component type (rendered as `<IconComponent />`) or
     * a React element (rendered as-is).
     */
    icon?: ElementType | ReactNode

    /**
     * Props forwarded to the internal listbox {@link Box} element that wraps
     * the rendered options.
     *
     * @beta Do not use in production.
     *
     * @defaultValue `{}`
     */
    listBox?: BoxOwnProps

    /**
     * When `true`, displays a loading spinner inside the input to indicate
     * that options are being fetched asynchronously.
     */
    loading?: boolean

    /**
     * Callback fired when an option is confirmed (selected and committed)
     * as the input's value.
     *
     * @remarks
     * Receives the `value` string of the selected option. This differs from
     * `onSelect`, which fires when an option is highlighted/selected in the
     * listbox but not yet committed.
     */
    onChange?: (value: string) => void

    /**
     * Callback fired when the text query in the input changes.
     *
     * @remarks
     * Receives the current query string, or `null` when the query is cleared
     * (e.g. when a value is selected or the input is reset).
     */
    onQueryChange?: (query: string | null) => void

    /**
     * Callback fired when an option is selected (highlighted) in the listbox.
     *
     * @remarks
     * Receives the `value` string of the selected option. This fires when a
     * user clicks an option or navigates to it and presses Enter.
     */
    onSelect?: (value: string) => void

    /**
     * Controls the visibility and configuration of a button that opens the
     * autocomplete dropdown.
     *
     * @remarks
     * When set to `true`, renders a default open button with a chevron icon.
     * When set to an {@link AutocompleteOpenButtonProps} object, renders a
     * button with the specified custom props. When `false` or `undefined`,
     * no open button is rendered.
     *
     * @beta Do not use in production.
     */
    openButton?: boolean | AutocompleteOpenButtonProps

    /**
     * When `true`, opens the autocomplete dropdown when the input receives focus.
     *
     * @beta Do not use in production.
     */
    openOnFocus?: boolean

    /**
     * The list of options to display in the autocomplete dropdown.
     *
     * @remarks
     * Each option must conform to the `O` type parameter, which extends
     * {@link BaseAutocompleteOption} (requiring at minimum a `value: string`
     * property). Options are filtered by the `filterOption` function when
     * a query is present.
     */
    options?: O[]

    /**
     * Sets the inner padding of the input element.
     *
     * @remarks
     * Uses the spacing scale defined by the theme. Supports responsive values.
     *
     * @defaultValue 3
     */
    padding?: ResponsiveProp<Space>

    /**
     * Props forwarded to the underlying {@link Popover} component that wraps
     * the autocomplete dropdown.
     *
     * @remarks
     * Accepts all {@link PopoverProps} except `content`, `onMouseEnter`,
     * `onMouseLeave`, and `open`, which are managed internally.
     *
     * @defaultValue `{}`
     */
    popover?: Omit<PopoverProps<'div'>, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'>

    /**
     * Content rendered before (to the left of) the input element, outside
     * the input's border.
     */
    prefix?: ReactNode

    /**
     * Sets the border radius of the input element.
     *
     * @remarks
     * Uses the radius scale defined by the theme. Accepts a single value or
     * an array of values for responsive behavior.
     *
     * @defaultValue 2
     */
    radius?: Radius | Radius[]

    /**
     * Additional DOM elements that should be considered "inside" the
     * autocomplete when determining whether focus has left the component.
     *
     * @remarks
     * Used to prevent the autocomplete dropdown from closing when focus
     * moves to one of the specified elements (e.g. a custom popover or
     * panel rendered alongside the autocomplete).
     *
     * @beta Do not use in production.
     */
    relatedElements?: HTMLElement[]

    /**
     * A custom render function for each option in the autocomplete dropdown.
     *
     * @remarks
     * Called once per visible option. Must return a React element that represents
     * the option's visual content. When not provided, each option is rendered
     * with its `value` string displayed in a default styled layout.
     *
     * @defaultValue (renders `option.value` as text)
     */
    renderOption?: (option: O) => React.JSX.Element

    /**
     * A custom render function for the popover wrapper around the autocomplete
     * dropdown content.
     *
     * @remarks
     * When provided, replaces the default {@link Popover} rendering. Receives
     * the popover content element, visibility state, input element reference,
     * and mouse event handlers as props, along with a forwarded ref for the
     * popover container.
     *
     * @beta Do not use in production.
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
     * A function that converts a selected option's value into the display
     * string shown in the input field.
     *
     * @remarks
     * Called when a value is selected to determine what text to display in
     * the input. Receives the raw value string and optionally the matching
     * option object. When not provided, the option's `value` property is
     * displayed as-is.
     *
     * @defaultValue (returns `option.value` or the raw value string)
     */
    renderValue?: (value: string, option?: O) => string

    /**
     * Content rendered after (to the right of) the input element, outside
     * the input's border.
     */
    suffix?: ReactNode

    /**
     * The currently selected value of the autocomplete.
     *
     * @remarks
     * When provided, the autocomplete operates in controlled mode. The value
     * corresponds to the `value` property of the selected option. The display
     * text is determined by the `renderValue` function.
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
 * @typeParam O - The shape of each option object. Must extend {@link BaseAutocompleteOption}.
 *
 * @public
 */
export type AutocompleteProps<
  E extends AutocompleteElementType = AutocompleteElementType,
  O extends BaseAutocompleteOption = BaseAutocompleteOption,
> = Props<AutocompleteOwnProps<O>, E>

const DEFAULT_RENDER_VALUE = (value: string, option?: BaseAutocompleteOption) =>
  option ? option.value : value

const DEFAULT_FILTER_OPTION = (query: string, option: BaseAutocompleteOption) =>
  option.value.toLowerCase().indexOf(query.toLowerCase()) > -1

/**
 * An autocomplete search input that displays a filterable dropdown of
 * suggestions as the user types.
 *
 * @remarks
 * The `Autocomplete` component combines a {@link TextInput} with a dropdown
 * {@link Popover} containing a listbox of filterable options. It manages the
 * full lifecycle of an autocomplete interaction: querying, filtering, keyboard
 * navigation (ArrowUp, ArrowDown, Enter, Escape), option selection, and
 * value display.
 *
 * Options are provided via the `options` prop and filtered by the `filterOption`
 * function whenever the query changes. The dropdown is rendered in a popover
 * that can be customized via the `popover` prop or fully replaced via
 * `renderPopover`.
 *
 * @typeParam E - The HTML element or component type to render.
 * @typeParam O - The shape of each option object.
 *
 * @public
 */
export function Autocomplete<
  E extends AutocompleteElementType = typeof DEFAULT_AUTOCOMPLETE_ELEMENT,
  O extends BaseAutocompleteOption = BaseAutocompleteOption,
>(props: AutocompleteProps<E, O>): React.JSX.Element {
  const {
    as = DEFAULT_AUTOCOMPLETE_ELEMENT,
    border = true,
    customValidity,
    disabled,
    filterOption: filterOptionProp,
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
    radius = 2,
    readOnly,
    ref: forwardedRef,
    relatedElements,
    renderOption: renderOptionProp,
    renderPopover,
    renderValue = DEFAULT_RENDER_VALUE,
    suffix,
    value: valueProp,
    ...rest
  } = props as AutocompleteProps<typeof DEFAULT_AUTOCOMPLETE_ELEMENT, O>

  const [state, dispatch] = useReducer(autocompleteReducer, {
    activeValue: valueProp || null,
    focused: false,
    listFocused: false,
    query: null,
    value: valueProp || null,
  })

  const {activeValue, focused, listFocused, query, value} = state

  const defaultRenderOption = useCallback(
    ({value}: BaseAutocompleteOption) => (
      <Selectable as="button" padding={paddingProp} radius={2}>
        <Text size={fontSize} textOverflow="ellipsis">
          {value}
        </Text>
      </Selectable>
    ),
    [fontSize, paddingProp],
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
  const padding = useResponsiveProp(paddingProp)
  const currentOption = useMemo(
    () => (value !== null ? options.find((o) => o.value === value) : undefined),
    [options, value],
  )
  const filteredOptions = useMemo(
    () => options.filter((option) => (query ? filterOption(query, option) : true)),
    [filterOption, options, query],
  )
  const filteredOptionsLen = filteredOptions.length
  const activeItemId = activeValue ? `${id}-option-${activeValue}` : undefined
  const expanded = (query !== null && loading) || (focused && query !== null)

  const handleRootBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
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
    },
    [onBlur, onQueryChange, relatedElements],
  )

  const handleRootFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const listBoxElement = listBoxElementRef.current
    const focusedElement = event.target instanceof HTMLElement ? event.target : null
    const listFocused = listBoxElement?.contains(focusedElement) || false

    if (listFocused !== listFocusedRef.current) {
      listFocusedRef.current = listFocused

      dispatch({type: 'root/setListFocused', listFocused})
    }
  }, [])

  const handleOptionSelect = useCallback(
    (v: string) => {
      dispatch({type: 'value/change', value: v})

      popoverMouseWithinRef.current = false

      if (onSelect) onSelect(v)

      valueRef.current = v

      if (onChange) onChange(v)
      if (onQueryChange) onQueryChange(null)

      inputElementRef.current?.focus()
    },
    [onChange, onSelect, onQueryChange],
  )

  const handleRootKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
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
    },
    [activeValue, filteredOptions, filteredOptionsLen, onQueryChange],
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextQuery = event.currentTarget.value

      dispatch({type: 'input/change', query: nextQuery})

      if (onQueryChange) onQueryChange(nextQuery)
    },
    [onQueryChange],
  )

  const dispatchOpen = useCallback(() => {
    dispatch({
      type: 'root/open',
      query: value ? renderValue(value, currentOption) : '',
    })
  }, [currentOption, renderValue, value])

  const handleInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!focused) {
        dispatch({type: 'input/focus'})

        if (onFocus) onFocus(event)
        if (openOnFocus) dispatchOpen()
      }
    },
    [focused, onFocus, openOnFocus, dispatchOpen],
  )

  const handlePopoverMouseEnter = useCallback(() => {
    popoverMouseWithinRef.current = true
  }, [])

  const handlePopoverMouseLeave = useCallback(() => {
    popoverMouseWithinRef.current = false
  }, [])

  const handleClearButtonClick = useCallback(() => {
    dispatch({type: 'root/clear'})
    valueRef.current = ''
    if (onChange) onChange('')
    if (onQueryChange) onQueryChange(null)
    inputElementRef.current?.focus()
  }, [onChange, onQueryChange])

  const handleClearButtonFocus = useCallback(() => {
    dispatch({type: 'input/focus'})
  }, [])

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

  const clearButton = useMemo(() => {
    if (!loading && !disabled && value) {
      return {
        'aria-label': 'Clear',
        onFocus: handleClearButtonFocus,
      }
    }

    return undefined
  }, [disabled, handleClearButtonFocus, loading, value])

  const openButtonBoxPadding = useMemo(() => {
    const result = Object.fromEntries(
      Object.entries(padding).map(([key, value]) => {
        if (value === 0) return [key, 0]
        if (value === 1) return [key, 1]
        if (value === 2) return [key, 1]

        return [key, (value as Space) - 2]
      }),
    ) as ResponsiveProp<Space>

    return result
  }, [padding])

  const openButtonPadding = useMemo(
    () => Object.values(padding).map((v) => Math.max((v as Space) - 1, 0)) as ResponsiveProp<Space>,
    [padding],
  )

  const openButtonProps: AutocompleteOpenButtonProps = useMemo(
    () => (typeof openButton === 'object' ? openButton : EMPTY_RECORD),
    [openButton],
  )

  const handleOpenClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      dispatchOpen()

      if (openButtonProps.onClick) openButtonProps.onClick(event)

      _raf(() => inputElementRef.current?.focus())
    },
    [openButtonProps, dispatchOpen],
  )

  const openButtonNode = useMemo(
    () =>
      !disabled && !readOnly && openButton ? (
        <Box aria-hidden={expanded} padding={openButtonBoxPadding}>
          <Button
            aria-label="Open"
            disabled={expanded}
            display="block"
            fontSize={fontSize}
            icon={ChevronDownIcon}
            mode="bleed"
            padding={openButtonPadding}
            {...openButtonProps}
            onClick={handleOpenClick}
          />
        </Box>
      ) : undefined,
    [
      disabled,
      expanded,
      fontSize,
      handleOpenClick,
      openButton,
      openButtonBoxPadding,
      openButtonPadding,
      openButtonProps,
      readOnly,
    ],
  )

  const inputValue = useMemo(() => {
    if (query === null) {
      if (value !== null) {
        return renderValue(value, currentOption)
      }

      return ''
    }

    return query
  }, [currentOption, query, renderValue, value])

  const handleListBoxKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // If the focus is currently in the list, move focus to the input element
      if (event.key === 'Tab') {
        if (listFocused) inputElementRef.current?.focus()
      }
    },
    [listFocused],
  )

  const content = useMemo(() => {
    if (filteredOptions.length === 0) return null

    return (
      <Box
        data-ui="AutoComplete__results"
        onKeyDown={handleListBoxKeyDown}
        padding={1}
        {...listBox}
        tabIndex={-1}
      >
        <Stack
          as="ul"
          aria-multiselectable={false}
          data-ui="AutoComplete__resultsList"
          gap={1}
          id={listBoxId}
          ref={listBoxElementRef}
          role="listbox"
        >
          {filteredOptions.map((option) => {
            const active =
              activeValue !== null ? option.value === activeValue : currentOption === option

            return (
              <AutocompleteOption
                id={`${id}-option-${option.value}`}
                key={option.value}
                onSelect={handleOptionSelect}
                selected={active}
                value={option.value}
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
  }, [
    activeValue,
    currentOption,
    filteredOptions,
    handleOptionSelect,
    handleListBoxKeyDown,
    id,
    listBox,
    listBoxId,
    listFocused,
    loading,
    renderOption,
  ])

  const results = useMemo(() => {
    if (renderPopover) {
      return (
        <RenderPopover
          content={content}
          hidden={!expanded}
          inputElement={inputElement}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          resultsPopoverElementRef={resultsPopoverElementRef}
          renderPopover={renderPopover}
        />
      )
    }

    if (filteredOptionsLen === 0) {
      return null
    }

    return (
      <Popover
        arrow={false}
        constrainSize
        content={content}
        fallbackPlacements={AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS}
        matchReferenceWidth
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
        open={expanded}
        overflow="auto"
        placement={AUTOCOMPLETE_POPOVER_PLACEMENT}
        portal
        radius={3}
        ref={resultsPopoverElementRef}
        referenceElement={inputElement}
        {...popover}
      />
    )
  }, [
    content,
    expanded,
    filteredOptionsLen,
    handlePopoverMouseEnter,
    handlePopoverMouseLeave,
    inputElement,
    popover,
    renderPopover,
  ])

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      data-ui="Autocomplete"
      onBlur={handleRootBlur}
      onFocus={handleRootFocus}
      onKeyDown={handleRootKeyDown}
      ref={rootElementRef}
    >
      <TextInput
        {...rest}
        aria-activedescendant={activeItemId}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-owns={listBoxId}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        as={as}
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
        ref={setInputElement}
        role="combobox"
        spellCheck={false}
        suffix={suffix || openButtonNode}
        value={inputValue}
      />
      {results}
    </div>
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
