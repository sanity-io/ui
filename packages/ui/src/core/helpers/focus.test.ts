/** @vitest-environment jsdom */

import {afterEach, describe, expect, it} from 'vitest'

import {
  _hasFocus,
  attemptFocus,
  focusFirstDescendant,
  focusLastDescendant,
  isFocusable,
} from './focus'

function createElement(html: string): HTMLElement {
  const container = document.createElement('div')
  container.innerHTML = html
  const element = container.firstElementChild

  if (!(element instanceof HTMLElement)) {
    throw new Error(`Expected one HTML element from: ${html}`)
  }

  return element
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('isFocusable', () => {
  it.each([
    ['<div />', false],
    ['<div tabindex="0" />', true],
    ['<a href="/target">target</a>', true],
    ['<a href="/target" rel="ignore">target</a>', false],
    ['<input />', true],
    ['<input disabled />', false],
    ['<input type="hidden" />', false],
    ['<input type="file" />', false],
    ['<button />', true],
    ['<button disabled />', false],
    ['<select />', true],
    ['<textarea />', true],
  ])('reports focusability for %s as %s', (html, expected) => {
    expect(isFocusable(createElement(html))).toBe(expected)
  })
})

describe('attemptFocus', () => {
  it('focuses eligible elements', () => {
    const button = createElement('<button />')
    document.body.appendChild(button)

    expect(attemptFocus(button)).toBe(true)
    expect(document.activeElement).toBe(button)
    expect(_hasFocus(document.body)).toBe(true)
  })

  it('returns false when focus is rejected', () => {
    const button = createElement('<button />')
    button.focus = () => {
      throw new Error('focus rejected')
    }
    document.body.appendChild(button)

    expect(attemptFocus(button)).toBe(false)
    expect(document.activeElement).not.toBe(button)
  })
})

describe('descendant focus', () => {
  it('focuses the first eligible nested descendant', () => {
    const root = createElement(`
      <div>
        text
        <button disabled>disabled</button>
        <div><button data-target="first">first</button></div>
        <button data-target="last">last</button>
      </div>
    `)
    document.body.appendChild(root)

    expect(focusFirstDescendant(root)).toBe(true)
    expect(document.activeElement?.getAttribute('data-target')).toBe('first')
  })

  it('focuses the last eligible nested descendant', () => {
    const root = createElement(`
      <div>
        <button data-target="first">first</button>
        <div><button data-target="last">last</button></div>
        <button disabled>disabled</button>
      </div>
    `)
    document.body.appendChild(root)

    expect(focusLastDescendant(root)).toBe(true)
    expect(document.activeElement?.getAttribute('data-target')).toBe('last')
  })

  it('returns false when there are no eligible descendants', () => {
    const root = createElement('<div>text<span>nested</span></div>')
    document.body.appendChild(root)

    expect(focusFirstDescendant(root)).toBe(false)
    expect(focusLastDescendant(root)).toBe(false)
    expect(_hasFocus(root)).toBe(false)
  })
})
