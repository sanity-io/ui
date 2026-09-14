export const REACT_MIN = '19.2'
export const NODE_REQUIREMENT = '>=20.19 <22 || >=22.12'

type Version = [number, number, number]

/** Parses a loose semver string into [major, minor, patch]; missing parts are 0. */
export function parseVersion(value: unknown): Version | null {
  if (typeof value !== 'string') return null
  const match = value.match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/)
  if (!match) return null
  return [Number(match[1] ?? 0), Number(match[2] ?? 0), Number(match[3] ?? 0)]
}

function gte(version: unknown, target: unknown): boolean {
  const a = parseVersion(version)
  const b = parseVersion(target)
  if (!a || !b) return false
  for (let i = 0; i < 3; i++) {
    const left = a[i] ?? 0
    const right = b[i] ?? 0
    if (left > right) return true
    if (left < right) return false
  }
  return true
}

export function meetsReact(version: unknown): boolean {
  return gte(version, REACT_MIN)
}

/** Implements the package's engines range: >=20.19 <22 || >=22.12 */
export function meetsNode(version: unknown): boolean {
  const v = parseVersion(version)
  if (!v) return false
  const [major, minor] = v
  if (major === 20 && minor >= 19) return true
  if (major === 21) return true
  if (major === 22 && minor >= 12) return true
  if (major > 22) return true
  return false
}
