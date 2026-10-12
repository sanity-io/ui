import {AutocompleteMsg, AutocompleteState} from './types'

/**
 * @internal
 */
export function autocompleteReducer(
  state: AutocompleteState,
  msg: AutocompleteMsg,
): AutocompleteState {
  if (msg.type === 'input/change') {
    return {...state, activeValue: null, focused: true, query: msg.query}
  }

  if (msg.type === 'input/focus') {
    return {...state, focused: true}
  }

  // Closing puts the active option back on the value. It also ends keyboard navigation in the list,
  // which an arrow key can start before the list shows, with no focus event to end it.
  if (msg.type === 'root/blur' || msg.type === 'root/escape') {
    return {
      ...state,
      activeValue: state.value || state.activeValue,
      focused: false,
      listFocused: false,
      query: null,
    }
  }

  if (msg.type === 'root/clear') {
    return {...state, activeValue: null, query: null, value: null}
  }

  if (msg.type === 'root/open') {
    return {...state, query: state.query ?? msg.query}
  }

  if (msg.type === 'root/setActiveValue') {
    return {...state, activeValue: msg.value, listFocused: msg.listFocused || state.listFocused}
  }

  if (msg.type === 'root/setListFocused') {
    return {...state, listFocused: msg.listFocused}
  }

  if (msg.type === 'value/change') {
    return {...state, activeValue: msg.value, query: null, value: msg.value}
  }

  return state
}
