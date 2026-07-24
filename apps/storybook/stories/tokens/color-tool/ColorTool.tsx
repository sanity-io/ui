import {COLOR_HUES, COLOR_TINTS, ColorHueKey, config} from '@sanity/color'
import {Stack, TextArea} from '@sanity/ui'
import {ReactNode, useReducer} from 'react'

import {ColorSwatchesEditor} from './ColorSwatchEditor'
import {compileCode} from './compileCode'
import {ColorHueNode, ColorToolMsg} from './types'

interface State {
  palette: ColorHueNode[]
}

function buildInitialState(): State {
  return {
    palette: COLOR_HUES.map((hue) => {
      const {tints} = config[hue]

      return {
        hue,
        swatches: COLOR_TINTS.map((tintKey) => ({
          key: tintKey,
          hsl: tints[tintKey].hsl,
        })),
      }
    }),
  }
}

function reducer(state: State, msg: ColorToolMsg): State {
  if (msg.type === 'swatch/update') {
    return {
      ...state,
      palette: state.palette.map((t) => {
        if (t.hue === msg.hue) {
          return {
            ...t,
            swatches: t.swatches.map((s) => {
              if (s.key === msg.tint) {
                return {...s, hsl: msg.hsl}
              }

              return s
            }),
          }
        }

        return t
      }),
    }
  }

  return state
}

export function ColorTool(props: {
  showAABadges?: boolean
  showCode?: boolean
  showContrast?: boolean
  visibleHues: ColorHueKey[]
}): ReactNode {
  const {showAABadges, showCode, showContrast, visibleHues} = props

  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState)

  const code = showCode ? compileCode(state.palette) : ''

  return (
    <Stack gap={1} padding={2}>
      <Stack gap={1}>
        {state.palette
          .filter((t) => visibleHues.includes(t.hue))
          .map((t) => (
            <ColorSwatchesEditor
              hue={t.hue}
              dispatch={dispatch}
              key={t.hue}
              showAABadges={showAABadges}
              showContrast={showContrast}
              swatches={t.swatches}
            />
          ))}
      </Stack>

      {code && <TextArea border={false} fontSize={0} radius={2} readOnly rows={30} value={code} />}
    </Stack>
  )
}
