import {Stack, TextArea} from '@sanity/ui'
import {ReactElement, useReducer} from 'react'
import {config} from '../../config'
import {COLOR_HUES} from '../../constants'
import {ColorHueKey, ColorTintKey} from '../../types'
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
        hue: hue as ColorHueKey,
        swatches: Object.entries(tints).map(([tint, color]) => {
          return {
            key: tint as ColorTintKey,
            hsl: color.hsl,
          }
        }),
      }
    }),
  }
}

function reducer(state: State, msg: ColorToolMsg) {
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
}): ReactElement {
  const {showAABadges, showCode, showContrast, visibleHues} = props

  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState)

  const code = showCode ? compileCode(state.palette) : ''

  return (
    <Stack padding={2} space={1}>
      <Stack space={1}>
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
