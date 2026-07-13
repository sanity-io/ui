export const ADDON_ID = 'performance'
export const PANEL_ID = `${ADDON_ID}/panel`
export const GLOBAL_COUNT_KEY = `${ADDON_ID}/count`
export const GLOBAL_BENCHMARK_KEY = `${ADDON_ID}/benchmark`

export const EVENTS = {
  RENDER: `${ADDON_ID}/render`,
} as const

export const PERFORMANCE_COUNT_OPTIONS = [500, 1000, 5000] as const
