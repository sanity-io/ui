export function dashCase(str: string): string {
  return (
    str
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      // remove leading dash
      .replace(/^-/, '')
      // remove trailing dash
      .replace(/-$/, '')
  )
}

export function sanitize(str: string): string {
  // remove all non-alphanumeric characters except for dashes
  return str.replace(/[^a-zA-Z0-9-]/g, '')
}
