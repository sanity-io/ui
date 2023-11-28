import {ButtonProps} from '../../primitives'

/**
 * @public
 */
export type AutocompleteOpenButtonProps = Omit<ButtonProps, 'as'> &
  Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'ref'>

/**
 * @public
 */
export interface BaseAutocompleteOption {
  value: string
}

/**
 * @internal
 */
export interface AutocompleteState {
  activeValue: string | null
  focused: boolean
  listFocused: boolean
  query: string | null
  value: string | null
}

/**
 * @internal
 */
export interface AutocompleteRootBlurMsg {
  type: 'root/blur'
}

/**
 * @internal
 */
export interface AutocompleteRootClearMsg {
  type: 'root/clear'
}

/**
 * @internal
 */
export interface AutocompleteRootEscapeMsg {
  type: 'root/escape'
}

/**
 * @internal
 */
export interface AutocompleteRootOpenMsg {
  type: 'root/open'
  query: string | null
}

/**
 * @internal
 */
export interface AutocompleteRootSetActiveValueMsg {
  type: 'root/setActiveValue'
  value: string
  listFocused?: boolean
}

/**
 * @internal
 */
export interface AutocompleteRootSetListFocusedMsg {
  type: 'root/setListFocused'
  listFocused: boolean
}

/**
 * @internal
 */
export interface AutocompleteInputChangeMsg {
  type: 'input/change'
  query: string | null
}

/**
 * @internal
 */
export interface AutocompleteInputFoocusMsg {
  type: 'input/focus'
}

/**
 * @internal
 */
export interface AutocompleteValueChangeMsg {
  type: 'value/change'
  value: string | null
}

/**
 * @internal
 */
export type AutocompleteMsg =
  | AutocompleteRootBlurMsg
  | AutocompleteRootClearMsg
  | AutocompleteRootEscapeMsg
  | AutocompleteRootOpenMsg
  | AutocompleteRootSetActiveValueMsg
  | AutocompleteRootSetListFocusedMsg
  | AutocompleteInputChangeMsg
  | AutocompleteInputFoocusMsg
  | AutocompleteValueChangeMsg
