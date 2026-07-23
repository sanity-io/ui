import {useEffect, useState, type CSSProperties} from 'react'

const panelStyle: CSSProperties = {
  position: 'fixed',
  right: 12,
  bottom: 12,
  zIndex: 9999,
  // Display-only: clicks must pass through, or the monitor would swallow
  // interactions on controls that scroll underneath it.
  pointerEvents: 'none',
  minWidth: 220,
  padding: '10px 14px',
  borderRadius: 8,
  background: 'rgba(17, 17, 20, 0.92)',
  color: '#e5e5e5',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  lineHeight: 1.6,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.35)',
}

const valueStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
}

const labelStyle: CSSProperties = {
  opacity: 0.7,
}

function Metric({label, value, unit}: {label: string; value: number | null; unit: string}) {
  return (
    <div style={{marginTop: 6}}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value === null ? '—' : `${value} ${unit}`}</div>
    </div>
  )
}

// Deepest nesting level from root node (main) and total element count
// within a subtree. Both exclude the root element itself, so measuring <main>
// reports the rendered route's DOM without the harness chrome around it.
function measureSubtree(root: Element) {
  let maxDepth = 0
  const walk = (el: Element, depth: number) => {
    if (depth > maxDepth) maxDepth = depth
    for (const child of el.children) walk(child, depth + 1)
  }
  for (const child of root.children) walk(child, 1)
  return {maxDepth, nodeCount: root.querySelectorAll('*').length}
}

/**
 * Live DOM-size readout for the current route. Deliberately built with plain
 * HTML so the monitor is byte-identical on both library pages and adds no
 * library work of its own. It measures the <main> subtree — which excludes
 * this fixed-position panel — so it never counts itself.
 */
export function DepthMonitor() {
  const [maxDepth, setMaxDepth] = useState<number | null>(null)
  const [nodeCount, setNodeCount] = useState<number | null>(null)

  useEffect(() => {
    const target = document.querySelector('main')
    if (!target) return

    let frame = 0
    const measure = () => {
      const result = measureSubtree(target)
      setMaxDepth(result.maxDepth)
      setNodeCount(result.nodeCount)
    }
    // One DOM change usually fires the observer several times in a burst.
    // Rather than walk the tree on each, cancel any pending frame and queue a
    // fresh one — so measure() runs at most once per frame, after the burst
    // has settled, against the finished tree instead of a half-built one.
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    // Measure now (routes are lazy, so content may mount after this effect)
    // and again whenever the route's DOM changes.
    schedule()
    const observer = new MutationObserver(schedule)
    observer.observe(target, {childList: true, subtree: true})
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <div style={panelStyle}>
      <Metric label="DOM nodes" value={nodeCount} unit="nodes" />
      <Metric label="Max depth" value={maxDepth} unit="levels" />
      <div style={{marginTop: 6, opacity: 0.6}}>measuring &lt;main&gt; · updates on DOM change</div>
    </div>
  )
}
