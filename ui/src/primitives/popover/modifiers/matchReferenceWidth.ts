import {Modifier} from '@popperjs/core'

export const matchReferenceWidthModifier: Modifier<'matchWidth', unknown> = {
  name: 'matchWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn({state}) {
    const {width} = state.rects.reference

    state.styles.popper.width = `${width}px`
  },
  effect: ({state}) => {
    const refElement = state.elements.reference

    if (refElement instanceof HTMLElement) {
      state.elements.popper.style.width = `${refElement.offsetWidth}px`
    }
  },
}
