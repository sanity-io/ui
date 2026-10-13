import {useEffect, useState} from 'react'

import {Showcase, type UiLib} from './Showcase.tsx'

interface Diagnostics {
  v1: string[]
  v2: string[]
  shared: string[]
}

/** Class names actually applied to rendered buttons, per version, read back from the DOM */
function collectClassNames(root: ParentNode, id: string): string[] {
  const names = new Set<string>()
  for (const el of root.querySelectorAll(`[data-testid^="${id}-"] [data-ui="Button"], [data-testid^="${id}-"][data-ui="Button"]`)) {
    for (const name of el.classList) names.add(name)
  }
  return [...names].sort()
}

export function Page({
  title,
  description,
  v1,
  v2,
}: {
  title: string
  description: string
  v1: UiLib
  v2: UiLib
}) {
  const [diag, setDiag] = useState<Diagnostics | null>(null)
  useEffect(() => {
    const a = collectClassNames(document, 'v1')
    const b = collectClassNames(document, 'v2')
    const bSet = new Set(b)
    setDiag({v1: a, v2: b, shared: a.filter((name) => bSet.has(name))})
  }, [])

  return (
    <main>
      <h1>{title}</h1>
      <p className="description">{description}</p>
      <div className="columns">
        <Showcase id="v1" lib={v1} />
        <Showcase id="v2" lib={v2} />
      </div>
      <aside className="diagnostics" data-testid="diagnostics">
        <h3>Class names on rendered buttons</h3>
        {diag && (
          <dl>
            <dt>v1 ({diag.v1.length})</dt>
            <dd>
              <code>{diag.v1.join(' ')}</code>
            </dd>
            <dt>v2 ({diag.v2.length})</dt>
            <dd>
              <code>{diag.v2.join(' ')}</code>
            </dd>
            <dt data-testid="shared-count" data-count={diag.shared.length}>
              shared by both versions ({diag.shared.length})
            </dt>
            <dd>
              <code data-testid="shared-classes">{diag.shared.join(' ') || '∅'}</code>
            </dd>
          </dl>
        )}
      </aside>
    </main>
  )
}
