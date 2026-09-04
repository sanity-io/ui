import {globalStyle, style} from '@vanilla-extract/css'

export const treeItem = style({
  selectors: {
    "&[role='treeitem']": {
      outline: 'none',
    },
  },
})

globalStyle(`${treeItem}[role='none'] > [role='treeitem']`, {
  outline: 'none',
  cursor: 'default',
  borderRadius: '3px',
  backgroundColor: 'var(--card-bg-color)',
  color: 'var(--treeitem-fg-color)',
})

globalStyle(`${treeItem}[role='none'] > [role='treeitem']:focus`, {
  position: 'relative',
})

globalStyle(`${treeItem}[role='treeitem'] > div`, {
  cursor: 'default',
  borderRadius: '3px',
  backgroundColor: 'var(--card-bg-color)',
  color: 'var(--treeitem-fg-color)',
})

globalStyle(`${treeItem}[role='treeitem']:focus > div`, {
  position: 'relative',
})

export const treeItemToggleArrow = style({})

globalStyle(`${treeItemToggleArrow} > svg`, {
  transition: 'transform 100ms',
})
