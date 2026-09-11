import {describe, expect, it} from 'vitest'

import {compileCommands, getRoundedCommands} from './cmds'

describe('getRoundedCommands', () => {
  it('keeps points without a radius unchanged', () => {
    expect(
      getRoundedCommands([
        {x: 0, y: 0},
        {x: 10, y: 0},
      ]),
    ).toEqual([
      {type: 'point', x: 0, y: 0},
      {type: 'point', x: 10, y: 0},
    ])
  })

  it('replaces a rounded corner with a point and curve', () => {
    expect(
      getRoundedCommands([
        {x: 0, y: 0},
        {x: 10, y: 0, radius: 2},
        {x: 10, y: 10},
      ]),
    ).toEqual([
      {type: 'point', x: 0, y: 0},
      {type: 'point', x: 8, y: 0},
      {
        type: 'curve',
        curveEnd: {x: 10, y: 2},
        endControl: {x: 10, y: 1},
        startControl: {x: 9, y: 0},
      },
      {type: 'point', x: 10, y: 10},
    ])
  })

  it('limits the radius to the adjacent segment lengths', () => {
    const commands = getRoundedCommands([
      {x: 0, y: 0},
      {x: 10, y: 0, radius: 20},
      {x: 10, y: 5},
    ])

    expect(commands[1]).toEqual({type: 'point', x: 0, y: 0})
    expect(commands[2]).toMatchObject({
      type: 'curve',
      curveEnd: {x: 10, y: 5},
    })
  })
})

describe('compileCommands', () => {
  it('compiles points and curves into an SVG path', () => {
    const path = compileCommands([
      {type: 'point', x: 0, y: 0},
      {type: 'point', x: 8, y: 0},
      {
        type: 'curve',
        startControl: {x: 9, y: 0},
        endControl: {x: 10, y: 1},
        curveEnd: {x: 10, y: 2},
      },
      {type: 'point', x: 10, y: 10},
    ])

    expect(path).toBe('M 0 0 L 8 0 C 9 0 10 1 10 2 L 10 10')
  })

  it('returns an empty path for no commands', () => {
    expect(compileCommands([])).toBe('')
  })
})
