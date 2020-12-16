import {data} from './__fixtures__/data'
import {findNavNode, getNavItems, getNavPaths, getNavStaticPaths} from './helpers'
import {isArray, isRecord} from '$lib/types'

describe('lib/nav', () => {
  it('should get nav items from raw data', () => {
    const arr = (isRecord(data) && isArray(data.items) && data.items) || []
    const items = getNavItems(arr)

    expect(items[0]).toEqual({
      collapsed: false,
      hidden: false,
      href: undefined,
      menuTitle: undefined,
      title: 'Home',
      segment: undefined,
      items: [],
    })
  })

  it('should get paths from raw data', () => {
    const arr = (isRecord(data) && isArray(data.items) && data.items) || []
    const paths = getNavPaths(arr)

    expect(paths[0]).toBe('/design')
    expect(paths[1]).toBe('/ui')
    expect(paths[2]).toBe('/ui/concepts')
    expect(paths[3]).toBe('/ui/theme')
  })

  it('should get static paths for Next.js', () => {
    const arr = (isRecord(data) && isArray(data.items) && data.items) || []
    const paths = getNavStaticPaths(arr)

    expect(paths[0]).toEqual({params: {path: ['design']}})
    expect(paths[1]).toEqual({params: {path: ['ui']}})
    expect(paths[2]).toEqual({params: {path: ['ui', 'concepts']}})
    expect(paths[3]).toEqual({params: {path: ['ui', 'theme']}})
  })

  it('should find target ID based on path array', () => {
    const arr = (isRecord(data) && isArray(data.items) && data.items) || []
    const node1 = findNavNode(arr, ['ui'])
    const node2 = findNavNode(arr, ['ui', 'atom', 'avatar'])

    expect(node1?.title).toBe('UI')
    expect(node2?.title).toBe('Avatar')
  })
})
