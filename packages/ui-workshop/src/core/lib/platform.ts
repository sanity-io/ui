/**
 * Detect the platform based on the user agent
 * @internal
 */
export function detectPlatform(): 'mac' | 'other' {
  if (typeof navigator === 'undefined') {
    return 'other'
  }

  const userAgent = navigator.userAgent || ''

  // Check for macOS, iOS, iPadOS
  // Note: navigator.platform is deprecated but still widely used
  // We check userAgent as primary detection method
  if (/Mac|iPhone|iPad|iPod/.test(userAgent)) {
    return 'mac'
  }

  // Fallback to platform for older browsers (navigator.platform is deprecated but widely supported)
  const platform = navigator.platform || ''
  if (/Mac|iPhone|iPad|iPod/.test(platform)) {
    return 'mac'
  }

  return 'other'
}
