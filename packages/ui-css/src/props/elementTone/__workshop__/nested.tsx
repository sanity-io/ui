import {code, elementTone, stack, vars} from '@sanity/ui-css'
import type {ElementTone} from '@sanity/ui-tokens/system'

import {_composeClassNames} from '../../../_composeClassNames'

export default function NestedStory() {
  return (
    <ElementTest style={{backgroundColor: vars.color.bg}} tone="suggest">
      <div className={code({size: 1})}>{`element`}</div>

      {/* nested element */}
      <ElementTest style={{backgroundColor: vars.color.muted.bg}} tone="critical">
        <div className={code({size: 1})}>{`element`}</div>
      </ElementTest>
    </ElementTest>
  )
}

function ElementTest(props: {
  children: React.ReactNode
  style?: React.CSSProperties
  tone: ElementTone
}) {
  const {children, style, tone} = props

  return (
    <div
      className={_composeClassNames(stack({gap: 4, padding: 4}), elementTone({elementTone: tone}))}
      style={style}
    >
      {children}
    </div>
  )
}
