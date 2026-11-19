import CloseIcon from '@sanity/icons/Close'
import SearchIcon from '@sanity/icons/Search'
import clsx from 'clsx'
import {useId, useRef} from 'react'

import {composeRefs} from '../../utils/composeRefs'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {PressArea} from '../press-area/PressArea'
import {type SearchInputProps, searchInputProps} from './searchInput.props'

const searchInputClassName = suffixClassName('sui-SearchInput')
const searchInputClearClassName = suffixClassName('sui-SearchInput-Clear')
const searchInputIconClassName = suffixClassName('sui-SearchInput-Icon')

/** @public */
export function SearchInput({
  density = 'regular',
  // A non-null placeholder to ensure that, if no placeholder is passed, the custom clear button's display logic still works (see search-input.css)
  placeholder = ' ',
  ref,
  ...props
}: SearchInputProps) {
  const {className, style, ...rest} = getProps({density, ...props}, searchInputProps)

  const searchInputClasses = clsx(searchInputClassName, 'sui-radius2', 'sui-width-full', className)
  const iconClasses = `sui-position-absolute sui-display-flex sui-align-items-center sui-px1`

  const anchorId = useId()
  const anchorName = `--anchor-${anchorId}`

  const inputRef = useRef<HTMLInputElement>(null)

  // Custom 'clear input' handler:
  // Gets the input's native value setter, resets to an empty string with that setter,
  // and dispatches an `input` event to notify React of the change. See:
  // https://github.com/facebook/react/issues/10135#issuecomment-401496776
  function handleClear() {
    const input = inputRef.current
    if (!input) return

    // oxlint-disable-next-line typescript/unbound-method -- called with an explicit `this` below
    const set = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')?.set
    set?.call(input, '')
    input.dispatchEvent(new Event('input', {bubbles: true}))
    // Focus the input after clearing, as native clear does
    input.focus()
  }

  return (
    <>
      <input
        className={searchInputClasses}
        style={{anchorName, ...style}}
        {...rest}
        placeholder={placeholder}
        type="search"
        data-ui="SearchInput"
        ref={composeRefs(inputRef, ref)}
      />
      <div
        className={clsx(searchInputClearClassName, iconClasses)}
        data-ui="Search-Clear"
        style={{positionAnchor: anchorName}}
      >
        <PressArea
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="sui-display-inline-flex sui-align-items-center sui-justify-content-center"
        >
          <Icon icon={CloseIcon} size={0} />
        </PressArea>
      </div>
      <div
        className={clsx(searchInputIconClassName, iconClasses)}
        data-ui="Search-Icon"
        style={{positionAnchor: anchorName}}
      >
        <Icon icon={SearchIcon} size={1} />
      </div>
    </>
  )
}

export type {SearchInputProps}
