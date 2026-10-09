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

  // Closing (blur and Escape) puts the active option back on the value, so the next time the
  // list opens, the value is highlighted and arrow navigation starts from it. Without a value
  // the last active option is kept. Keyboard navigation in the list ends with the list: an arrow
  // key pressed while the list was still opening set `listFocused` with DOM focus still in the
  // input, and a close then would leave it set, since no focus event follows.
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
