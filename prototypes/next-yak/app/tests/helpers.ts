import type {Page} from '@playwright/test'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

/** Class names that have a rule in a version's emitted stylesheet */
export function stylesheetClasses(version: 1 | 2, dir: 'dist' | 'dist-unsafe'): Set<string> {
  const css = readFileSync(
    resolve(import.meta.dirname, `../../packages/ui-v${version}/${dir}/styles.css`),
    'utf8',
  )
  return new Set([...css.matchAll(/^\.([A-Za-z0-9_-]+)/gm)].map((m) => m[1]))
}

export function intersect(a: Set<string>, b: Set<string>): string[] {
  return [...a].filter((x) => b.has(x)).sort()
}

/** Computed style snapshot of a rendered Button */
export interface ButtonStyles {
  backgroundColor: string
  color: string
  borderRadius: string
  fontWeight: string
  fontSize: string
  textTransform: string
  boxShadow: string
  padding: string
  width: string
  classes: string[]
}

export async function readButton(page: Page, testId: string): Promise<ButtonStyles> {
  return page.getByTestId(testId).evaluate((el) => {
    const s = getComputedStyle(el)
    return {
      backgroundColor: s.backgroundColor,
      color: s.color,
      borderRadius: s.borderRadius,
      fontWeight: s.fontWeight,
      fontSize: s.fontSize,
      textTransform: s.textTransform,
      boxShadow: s.boxShadow,
      padding: s.padding,
      width: s.width,
      classes: [...el.classList],
    }
  })
}

export async function readSharedClasses(page: Page): Promise<string[]> {
  const text = await page.getByTestId('shared-classes').innerText()
  return text === '∅' ? [] : text.split(/\s+/).filter(Boolean)
}

/** Theme values from `packages/ui-v1/src/theme.tsx` (identical in v2), as the browser reports them */
export const LIGHT = {
  primaryBg: 'rgb(34, 118, 252)', // #2276fc
  primaryFg: 'rgb(255, 255, 255)',
  primaryText: 'rgb(26, 95, 208)', // #1a5fd0
  positiveBg: 'rgb(46, 158, 95)', // #2e9e5f
  criticalBg: 'rgb(225, 60, 60)', // #e13c3c
  defaultBg: 'rgb(255, 255, 255)',
}

export const DARK = {
  primaryBg: 'rgb(63, 135, 255)', // #3f87ff
  defaultBg: 'rgb(31, 36, 45)', // #1f242d
}
