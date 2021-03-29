import {Modifier} from '@popperjs/core'

export const applyMaxSizeModifier: Modifier<'applyMaxSize', Record<string, unknown>> = {
  name: 'applyMaxSize',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn({state}) {
    const {width, height} = state.modifiersData.maxSize

    state.styles.popper = {
      ...state.styles.popper,
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
    }
  },
}
