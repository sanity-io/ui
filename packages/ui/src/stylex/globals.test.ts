import {describe, expect, it} from 'vitest'

import {lowerStylexCss} from '../../scripts/stylex-options'
import {buttonLabel, globalSheet, hashCss} from './globals'

import {buttonRoot} from '../core/primitives/button/button.css'

describe('static descendant classes', () => {
  it('puts the button label class on the button and in the stylesheet', () => {
    expect(buttonRoot.split(' ')).toContain(buttonLabel.className)
    expect(globalSheet).toContain(`.${buttonLabel.className} > span`)
    expect(buttonLabel.className).toMatch(/^c[0-9a-z]{8,13}$/)
  })

  it('changes the class when the rule body changes', () => {
    expect(hashCss('a')).not.toBe(hashCss('b'))
  })
})

describe('lowerStylexCss', () => {
  const sample = `
.xaaa{color:red}
@media screen and (prefers-reduced-motion: reduce){.xbbb.xbbb{background-color:blue}}
.xccc{display:block}
`

  it('emits one class inside media and places that block after the base rules', () => {
    const css = lowerStylexCss(sample)
    const mediaAt = css.indexOf('@media')
    const baseAt = css.indexOf('.xccc')

    expect(css).not.toContain('.xbbb.xbbb')
    expect(css).toContain('.xbbb')
    expect(mediaAt).toBeGreaterThan(baseAt)
    expect(css).not.toContain(':not(#\\#)')
    expect(css.startsWith('@layer sui;@layer sui.global{')).toBe(true)
    expect(css).toContain(`.${buttonLabel.className}>span`)
  })

  it('does not append the descendant sheet twice', () => {
    const once = lowerStylexCss(sample)
    const twice = lowerStylexCss(once)
    const needle = `.${buttonLabel.className}>span`
    const count = twice.split(needle).length - 1

    expect(count).toBe(1)
  })
})
