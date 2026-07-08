import {useEffect, useState, type CSSProperties} from 'react'
import {onINP} from 'web-vitals'

// Thresholds from Google's INP scoring: good ≤ 200 ms, poor > 500 ms.
function ratingColor(ms: number) {
  if (ms <= 200) return '#4ade80'
  if (ms <= 500) return '#fbbf24'
  return '#f87171'
}

const panelStyle: CSSProperties = {
  position: 'fixed',
  right: 12,
  bottom: 12,
  zIndex: 9999,
  // Display-only: clicks must pass through, or the monitor itself would
  // swallow interactions on controls that scroll underneath it.
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

// Each headline metric renders identically — a label above a large value — so
// the three read as equally important rather than one being the "hero".
function Metric({label, value}: {label: string; value: number | null}) {
  return (
    <div style={{marginTop: 6}}>
      <div style={labelStyle}>{label}</div>
      <div style={{...valueStyle, color: value === null ? '#e5e5e5' : ratingColor(value)}}>
        {value === null ? '—' : `${Math.round(value)} ms`}
      </div>
    </div>
  )
}

/**
 * Live interaction-latency readout. Deliberately built with plain HTML so the
 * monitor is byte-identical on both library pages and adds no library work of
 * its own. PerformanceObserver callbacks fire after the interaction has
 * painted, so updating this panel does not count toward the measured numbers.
 */
export function InpMonitor() {
  const [inp, setInp] = useState<number | null>(null)
  const [last, setLast] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [avg, setAvg] = useState<number | null>(null)

  useEffect(() => {
    // The page's official INP score (worst interaction so far).
    onINP((metric) => setInp(metric.value), {reportAllChanges: true, durationThreshold: 0})
  }, [])

  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return

    // One interaction produces several event entries (pointerdown, pointerup,
    // click…) sharing an interactionId; INP uses the longest one.
    const maxDurationById = new Map<number, number>()

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const {interactionId, duration} = entry as PerformanceEventTiming
        if (!interactionId) continue
        const prev = maxDurationById.get(interactionId) ?? 0
        if (duration > prev) {
          maxDurationById.set(interactionId, duration)
          setLast(duration)
        }
      }
      // Average each interaction's own latency over all interactions. Summing
      // the map values (rather than a running total) keeps it correct when an
      // interactionId's max duration grows across separate observer batches.
      let sum = 0
      for (const duration of maxDurationById.values()) sum += duration
      setCount(maxDurationById.size)
      setAvg(maxDurationById.size === 0 ? null : sum / maxDurationById.size)
    })

    // 16 ms is the smallest threshold the browser accepts.
    observer.observe({type: 'event', durationThreshold: 16} as PerformanceObserverInit)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={panelStyle}>
      <Metric label="Average INP" value={avg} />
      <Metric label="Page INP" value={inp} />
      <Metric label="Last interaction" value={last} />
      <div style={{marginTop: 6}}>Interactions: {count}</div>
      <div style={{marginTop: 6, opacity: 0.6}}>
        {count === 0 ? 'click something · ' : ''}good ≤ 200 ms · reload to reset
      </div>
    </div>
  )
}
