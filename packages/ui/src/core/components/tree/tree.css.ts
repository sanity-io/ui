import {css} from '#styled-system/css'

export const treeItem = css({
  "&[role='treeitem']": {
    outline: 'none',
  },
  "&[role='none'] > [role='treeitem']": {
    outline: 'none',
    cursor: 'default',
    borderRadius: '3px',
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--treeitem-fg-color)',
  },
  "&[role='none'] > [role='treeitem']:focus": {
    position: 'relative',
  },
  "&[role='treeitem'] > div": {
    cursor: 'default',
    borderRadius: '3px',
    backgroundColor: 'var(--card-bg-color)',
    color: 'var(--treeitem-fg-color)',
  },
  "&[role='treeitem']:focus > div": {
    position: 'relative',
  },
})

export const treeItemToggleArrow = css({
  transition: 'transform 100ms',
})
