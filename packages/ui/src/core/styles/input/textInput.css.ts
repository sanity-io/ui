import {style} from '@vanilla-extract/css'

// TextInput renders its root as a Card, whose Box styles own `display`, so the
// flex layout comes from the `display` prop there and only the alignment lives
// here. TextArea's root is a plain span, so it reuses that class and adds display.
export const textInputRoot = style({
  alignItems: 'center',
})

export const textAreaRoot = style([
  textInputRoot,
  {
    selectors: {
      '&:not([hidden])': {
        display: 'flex',
      },
    },
  },
])

export const inputRoot = style({
  flex: 1,
  minWidth: 0,
  display: 'block',
  position: 'relative',
})
