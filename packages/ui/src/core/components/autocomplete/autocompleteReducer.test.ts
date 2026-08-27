import {describe, expect, it} from 'vitest'

import {autocompleteReducer} from './autocompleteReducer'
import {AutocompleteMsg, AutocompleteState} from './types'

const state: AutocompleteState = {
  activeValue: 'active',
  focused: false,
  listFocused: false,
  query: 'current query',
  value: 'selected',
}

function reduce(msg: AutocompleteMsg, initialState = state) {
  return autocompleteReducer(initialState, msg)
}

describe('autocompleteReducer', () => {
  it('starts a new query and resets the active option', () => {
    expect(reduce({type: 'input/change', query: 'next query'})).toEqual({
      ...state,
      activeValue: null,
      focused: true,
      query: 'next query',
    })
  })

  it('tracks input focus', () => {
    expect(reduce({type: 'input/focus'})).toEqual({...state, focused: true})
  })

  it.each(['root/blur', 'root/escape'] as const)('closes on %s', (type) => {
    expect(reduce({type})).toEqual({...state, focused: false, query: null})
  })

  it('clears the query and selected values', () => {
    expect(reduce({type: 'root/clear'})).toEqual({
      ...state,
      activeValue: null,
      query: null,
      value: null,
    })
  })

  it('uses the opening query when no query exists', () => {
    expect(
      reduce(
        {type: 'root/open', query: 'opening query'},
        {
          ...state,
          query: null,
        },
      ),
    ).toEqual({...state, query: 'opening query'})
  })

  it('preserves an existing query when opening', () => {
    expect(reduce({type: 'root/open', query: 'opening query'})).toEqual(state)
  })

  it('tracks the active option and list focus', () => {
    expect(
      reduce({
        type: 'root/setActiveValue',
        value: 'next option',
        listFocused: true,
      }),
    ).toEqual({
      ...state,
      activeValue: 'next option',
      listFocused: true,
    })
  })

  it('preserves list focus when the active option changes', () => {
    expect(
      reduce(
        {
          type: 'root/setActiveValue',
          value: 'next option',
          listFocused: false,
        },
        {...state, listFocused: true},
      ),
    ).toEqual({
      ...state,
      activeValue: 'next option',
      listFocused: true,
    })
  })

  it('sets list focus directly', () => {
    expect(reduce({type: 'root/setListFocused', listFocused: true})).toEqual({
      ...state,
      listFocused: true,
    })
  })

  it('selects a value and closes the query', () => {
    expect(reduce({type: 'value/change', value: 'next option'})).toEqual({
      ...state,
      activeValue: 'next option',
      query: null,
      value: 'next option',
    })
  })
})
