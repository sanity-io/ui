import {style} from '@vanilla-extract/css'

// TextInput renders its root as a Card, whose Box styles own `display`, so the
// flex layout comes from the `display` prop there and only the alignment lives
// here. TextArea's root is a plain span and carries both.
export const textInputRoot = style({
  alignItems: 'center',
})

export const textAreaRoot = style({
  alignItems: 'center',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})

export const inputRoot = style({
  flex: 1,
  minWidth: 0,
  display: 'block',
  position: 'relative',
})
