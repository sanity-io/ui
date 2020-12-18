import {nav} from './__fixtures__/data'
import {buildNavMenu, findNavNode, getNavItems, getNavPaths, getNavStaticPaths} from './nav'
import {isArray, isRecord} from '$lib/types'

describe('lib/nav', () => {
  describe('getNavItems', () => {
    it('should get nav items from raw data', () => {
      const data = (isRecord(nav) && isArray(nav.items) && nav.items) || []
      const items = getNavItems(data)

      expect(items[1]).toEqual({
        collapsed: false,
        hidden: false,
        href: '/arcade',
        // menuTitle: 'Arcade',
        title: 'Arcade',
        segment: 'arcade',
        items: [],
      })
    })
  })

  describe('buildNavMenu', () => {
    const data = (isRecord(nav) && isArray(nav.items) && nav.items) || []
    const items = getNavItems(data)
    const menus = items.map((item) => buildNavMenu(item))

    expect(menus[0] === null).toBe(false)

    if (menus[0]) {
      expect(menus[0].type).toBe('menu')
      expect(menus[0].title).toBe('Docs')
      expect(menus[0].items[0].title).toBeUndefined()
      expect(menus[0].items[0].type === 'menu' && menus[0].items[0].items.length).toBe(3)
    }
  })

  describe('getNavPaths', () => {
    it('should get paths from raw data', () => {
      const data = (isRecord(nav) && isArray(nav.items) && nav.items) || []
      const paths = getNavPaths(data)

      expect(paths[0]).toBe('/docs')
      expect(paths[1]).toBe('/docs/motivation')
      expect(paths[2]).toBe('/docs/theme')
    })
  })

  describe('getNavStaticPaths', () => {
    it('should get static paths for Next.js', () => {
      const data = (isRecord(nav) && isArray(nav.items) && nav.items) || []
      const paths = getNavStaticPaths(data)

      expect(paths[0]).toEqual({params: {path: ['docs']}})
      expect(paths[1]).toEqual({params: {path: ['docs', 'motivation']}})
      expect(paths[2]).toEqual({params: {path: ['docs', 'theme']}})
    })
  })

  describe('findNavNode', () => {
    it('should find target ID based on path array', () => {
      const data = (isRecord(nav) && isArray(nav.items) && nav.items) || []
      const node1 = findNavNode(data, ['docs'])
      const node2 = findNavNode(data, ['docs', 'primitive', 'avatar'])

      expect(node1?.title).toBe('Docs')
      expect(node2?.title).toBe('Avatar')
    })
  })
})
