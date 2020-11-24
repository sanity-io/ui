import {data} from './__fixtures__/data'
import {
  findNavNode,
  getNavItems,
  getNavPaths,
  getNavPathSegments,
  getNavStaticPaths,
} from './helpers'

describe('lib/nav', () => {
  it('should get nav items from raw data', () => {
    const items = getNavItems(data.items || [])

    expect(items[0]).toEqual({href: undefined, title: 'Home', items: []})
  })

  it('should get paths from raw data', () => {
    const paths = getNavPaths(data.items)

    expect(paths[0]).toBe('/design')
    expect(paths[1]).toBe('/ui')
    expect(paths[2]).toBe('/ui/concepts')
    expect(paths[3]).toBe('/ui/theme')
  })

  it('should get path segments from raw data', () => {
    const segmentsArr = getNavPathSegments(data.items)

    expect(segmentsArr[0]).toEqual(['design'])
    expect(segmentsArr[1]).toEqual(['ui'])
    expect(segmentsArr[2]).toEqual(['ui', 'concepts'])
    expect(segmentsArr[3]).toEqual(['ui', 'theme'])
  })

  it('should get static paths for Next.js', () => {
    const paths = getNavStaticPaths(data.items)

    expect(paths[0]).toEqual({params: {path: ['design']}})
    expect(paths[1]).toEqual({params: {path: ['ui']}})
    expect(paths[2]).toEqual({params: {path: ['ui', 'concepts']}})
    expect(paths[3]).toEqual({params: {path: ['ui', 'theme']}})
  })

  it('should find target ID based on path array', () => {
    const node1 = findNavNode(data.items, ['ui'])
    const node2 = findNavNode(data.items, ['ui', 'atom', 'avatar'])

    expect(node1.title).toBe('UI')
    expect(node2.title).toBe('Avatar')
  })
})
