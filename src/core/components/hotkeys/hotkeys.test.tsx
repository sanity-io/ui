/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Inline} from '../../primitives'
import {Hotkeys} from './hotkeys'

jest.mock('../../primitives', () => {
  const actual = jest.requireActual('../../primitives')

  return {
    ...actual,
    Inline: jest.fn((props: Record<string, unknown>) => (actual.Inline as any).render(props, null)),
  }
})

describe('components/hotkeys spacing', () => {
  const mockedInline = jest.mocked(Inline)

  beforeEach(() => {
    mockedInline.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(<Hotkeys keys={['Ctrl', 'S']} space={2} />)
    expect(mockedInline.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: [2]}),
    )

    mockedInline.mockClear()
    render(<Hotkeys gap={2} keys={['Ctrl', 'S']} />)
    expect(mockedInline.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: [2]}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(<Hotkeys gap={3} keys={['Ctrl', 'S']} space={1} />)
    const propsList = mockedInline.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [3]}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: [1]}))
  })
})
