'use client'

// The `@sanity/ui/autocomplete` entry point. `Autocomplete` renders its
// results in a `Popover` (which depends on `@floating-ui/react-dom` and
// `motion`), so it lives on its own subpath to keep those dependencies out of
// the root entry point.
export {
  Autocomplete,
  type AutocompleteProps,
} from '../core/components/autocomplete/autocomplete'
export type {
  AutocompleteInputChangeMsg,
  AutocompleteInputFoocusMsg,
  AutocompleteMsg,
  AutocompleteOpenButtonProps,
  AutocompleteRootBlurMsg,
  AutocompleteRootClearMsg,
  AutocompleteRootEscapeMsg,
  AutocompleteRootOpenMsg,
  AutocompleteRootSetActiveValueMsg,
  AutocompleteRootSetListFocusedMsg,
  AutocompleteState,
  AutocompleteValueChangeMsg,
  BaseAutocompleteOption,
} from '../core/components/autocomplete/types'
