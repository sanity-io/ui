import {ChevronDownIcon} from '@sanity/icons/ChevronDown'
import {SpinnerIcon} from '@sanity/icons/Spinner'
import {clsx} from 'clsx/lite'
import {
  ChangeEvent,
  cloneElement,
  ElementType,
  FocusEvent,
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useDeferredValue,
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
import {Box, BoxProps} from '../../primitives/box/box'
import {Button} from '../../primitives/button/button'
import {Card} from '../../primitives/card/card'
import {Popover, PopoverProps} from '../../primitives/popover/popover'
import {Stack} from '../../primitives/stack/stack'
import {Text} from '../../primitives/text/text'
import {TextInput} from '../../primitives/textInput/textInput'
import {_getArrayProp} from '../../styles/helpers'
import {Radius} from '../../types/radius'
import {AutocompleteOption} from './autocompleteOption'
import {autocompleteReducer} from './autocompleteReducer'
import {
  AUTOCOMPLETE_LISTBOX_IGNORE_KEYS,
  AUTOCOMPLETE_POPOVER_FALLBACK_PLACEMENTS,
  AUTOCOMPLETE_POPOVER_PLACEMENT,
} from './constants'
import {AutocompleteOpenButtonProps, BaseAutocompleteOption} from './types'

import {spinnerIcon} from '../../primitives/spinner/spinner.css'
import {autocomplete, autocompleteListBox} from './autocomplete.css'

/**
 * @public
 */
export interface AutocompleteProps<Option extends BaseAutocompleteOption = BaseAutocompleteOption> {
  border?: boolean
  customValidity?: string
  filterOption?: (query: string, option: Option) => boolean
  fontSize?: number | number[]
  // oxlint-disable-next-line no-redundant-type-constituents
  icon?: ElementType | ReactNode
  id: string
  /** @beta */
  listBox?: BoxProps
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
  padding?: number | number[]
  popover?: Omit<PopoverProps, 'content' | 'onMouseEnter' | 'onMouseLeave' | 'open'> &
    Omit<HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'ref' | 'width'>
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
    ref: Ref<HTMLDivElement>,
  ) => ReactNode
  renderValue?: (value: string, option?: Option) => string
  suffix?: ReactNode
  /** The current value. */
  value?: string
}

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
export function Autocomplete<Option extends BaseAutocompleteOption>(
  props: AutocompleteProps<Option> &
    Omit<
      HTMLProps<HTMLInputElement>,
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
      | 'popover'
      | 'prefix'
      | 'role'
      | 'spellCheck'
      | 'type'
      | 'value'
    >,
) {
  const {
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
    ...restProps
  } = props

  const [state, dispatch] = useReducer(autocompleteReducer, {
    activeValue: valueProp || null,
    focused: false,
    listFocused: false,
    query: null,
    value: valueProp || null,
  })

  const {activeValue, focused, listFocused, query, value} = state

  // Follow the `value` prop. Compared during render rather than in an effect, so the new value is
  // in the first committed frame instead of one commit later.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  //
  // The prop is applied only when it changes. A selection or clear the parent does not answer
  // with a new `value` stays visible: `onChange` has been called, and the component keeps its
  // own state until the parent sets a value again. A prop that becomes `undefined` leaves the
  // current value in place, like a controlled `<input>` that switches to uncontrolled.
  const [prevValueProp, setPrevValueProp] = useState(valueProp)

  if (valueProp !== prevValueProp) {
    setPrevValueProp(valueProp)
    if (valueProp !== undefined) dispatch({type: 'value/change', value: valueProp})
  }

  const defaultRenderOption = useCallback(
    ({value}: BaseAutocompleteOption) => (
      <Card data-as="button" padding={paddingProp} radius={2} tone="inherit">
        <Text size={fontSize} textOverflow="ellipsis">
          {value}
        </Text>
      </Card>
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
  // Memoized by hand (the compiler rebuilt this array and the two derived from it below on every
  // render), so that `TextInput` does not re-render, and re-attach its forwarded ref, on every
  // render of this component
  const padding = useMemo(() => _getArrayProp(paddingProp), [paddingProp])
  const currentOption = useMemo(
    () => (value !== null ? options.find((o) => o.value === value) : undefined),
    [options, value],
  )
  // The results show while a query is in progress and the input has focus (or the results are
  // loading). The popover follows one render later, at transition priority: the urgent render
  // (a keystroke, a selection, focus leaving) updates the input and the state, the deferred one
  // opens or closes the list and filters it. So opening never interrupts a pre-render in
  // progress inside the popover's hidden `<Activity>` (it pre-renders on intent, in a
  // transition) and never holds up the input with the options to render. The state itself stays
  // synchronous on purpose: dispatching an open or close inside `startTransition` would race the
  // render-time `value` sync above, because React does not keep a render-phase update while a
  // lower-priority update is pending in the same reducer; a parent that answers `onChange` with
  // another value in the same tick would lose it.
  //
  // The query the options are filtered by is deferred along with the open (it is the query the
  // list is open for, and `null` while closed), so the two cannot disagree: closing (a
  // selection, a clear, a blur, Escape) drops the query in the urgent render, and no query
  // filters nothing, so a list that has not hidden yet would show every option in the frame
  // before it closes. `aria-expanded`, the open button and the popover all follow the deferred
  // value.
  const shouldExpand = (query !== null && loading) || (focused && query !== null)
  const expandedQuery = useDeferredValue(shouldExpand ? query : null)
  const expanded = expandedQuery !== null
  const filteredOptions = useMemo(
    () => options.filter((option) => (expandedQuery ? filterOption(expandedQuery, option) : true)),
    [expandedQuery, filterOption, options],
  )
  const filteredOptionsLen = filteredOptions.length
  const activeItemId = activeValue ? `${id}-option-${activeValue}` : undefined

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

        // oxlint-disable-next-line no-unnecessary-boolean-literal-compare
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

      // oxlint-disable-next-line no-unsafe-type-assertion
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
    if (onChange) onChange('')
    if (onQueryChange) onQueryChange(null)
    inputElementRef.current?.focus()
  }, [onChange, onQueryChange])

  const handleClearButtonFocus = useCallback(() => {
    dispatch({type: 'input/focus'})
  }, [])

  // Focus the selected item
  useEffect(() => {
    const listElement = listBoxElementRef.current

    if (!listElement) return

    const activeOption = filteredOptions.find((o) => o.value === activeValue)

    if (activeOption) {
      const activeIndex = filteredOptions.indexOf(activeOption)
      // oxlint-disable-next-line no-unsafe-type-assertion
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
        'onFocus': handleClearButtonFocus,
      }
    }

    return undefined
  }, [disabled, handleClearButtonFocus, loading, value])

  const openButtonBoxPadding = useMemo(
    () =>
      padding.map((v) => {
        if (v === 0) return 0
        if (v === 1) return 1
        if (v === 2) return 1

        return v - 2
      }),
    [padding],
  )
  const openButtonPadding = useMemo(() => padding.map((v) => Math.max(v - 1, 0)), [padding])
  const openButtonProps: AutocompleteOpenButtonProps =
    typeof openButton === 'object' ? openButton : EMPTY_RECORD

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
        className={clsx(autocompleteListBox, listBox?.className)}
        tabIndex={-1}
      >
        <Stack
          as="ul"
          aria-multiselectable={false}
          data-ui="AutoComplete__resultsList"
          id={listBoxId}
          ref={listBoxElementRef}
          // oxlint-disable-next-line prefer-tag-over-role
          role="listbox"
          gap={1}
        >
          {filteredOptions.map((option) => {
            const active =
              activeValue !== null ? option.value === activeValue : currentOption === option

            return (
              <AutocompleteOption
                key={option.value}
                id={`${id}-option-${option.value}`}
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
        radius={radius}
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
    radius,
    renderPopover,
  ])

  return (
    // The handlers only observe focus and key events bubbling from the input and
    // list box, which carry the roles; the wrapper itself is not interactive.
    // oxlint-disable-next-line no-static-element-interactions
    <div
      className={autocomplete}
      data-ui="Autocomplete"
      onBlur={handleRootBlur}
      onFocus={handleRootFocus}
      onKeyDown={handleRootKeyDown}
      ref={rootElementRef}
    >
      <TextInput
        {...restProps}
        aria-activedescendant={activeItemId}
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-owns={listBoxId}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        border={border}
        clearButton={clearButton}
        customValidity={customValidity}
        disabled={disabled}
        fontSize={fontSize}
        icon={icon}
        iconRight={loading && <SpinnerIcon className={spinnerIcon} />}
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
        // oxlint-disable-next-line prefer-tag-over-role, role-has-required-aria-props
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
