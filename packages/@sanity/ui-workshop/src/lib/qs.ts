/** @internal */
export const qs = {
  parse(str: string): Record<string, string> {
    const params = new URLSearchParams('?' + str)
    const q: Record<string, string> = {}

    params.forEach((value, key) => {
      q[key] = value
    })

    return q
  },

  stringify(q: {[key: string]: unknown}): string {
    return Object.entries(q)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  },
}
