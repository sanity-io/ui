import {ArcadeMsg, ArcadeState} from './types'

export function arcadeReducer(state: ArcadeState, msg: ArcadeMsg): ArcadeState {
  if (msg.type === 'init') {
    return {
      ...state,
      canvasWidth: msg.canvasWidth,
      codeMode: msg.codeMode,
      hookCode: msg.hookCode,
      jsxCode: msg.jsxCode,
      meta: msg.meta,
    }
  }

  if (msg.type === 'setCanvasWidth') {
    return {
      ...state,
      canvasWidth: msg.value,
    }
  }

  if (msg.type === 'setCodeMode') {
    return {
      ...state,
      codeMode: msg.value,
    }
  }

  if (msg.type === 'setHookCode') {
    return {
      ...state,
      hookCode: msg.value,
    }
  }

  if (msg.type === 'setHookCursor') {
    return {
      ...state,
      hookCursor: msg.value,
    }
  }

  if (msg.type === 'setJSXCode') {
    return {
      ...state,
      jsxCode: msg.value,
    }
  }

  if (msg.type === 'setJSXCursor') {
    return {
      ...state,
      jsxCursor: msg.value,
    }
  }

  if (msg.type === 'setMeta') {
    return {
      ...state,
      meta: msg.value,
    }
  }

  // console.warn('unhandled msg', msg)

  return state
}
