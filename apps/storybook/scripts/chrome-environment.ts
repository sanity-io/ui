/**
 * The environment the `react-devtools-mcp:chrome` launcher starts Chrome with. Chrome gets
 * exactly the allowlisted variables and nothing else from the caller's shell, so whatever else
 * the shell holds (tokens, cloud credentials, any *_KEY) never shows up in /proc/<pid>/environ
 * for the browser's lifetime.
 *
 * Covered: user and paths, temp dirs, locale and time zone, the display and session bus, proxy
 * settings, the two CA bundle variables, four Chrome knobs by exact name, the Windows essentials
 * and macOS's text encoding hint. GOOGLE_* is left out on purpose: the launcher relies on none of those and
 * GOOGLE_API_KEY / GOOGLE_DEFAULT_CLIENT_SECRET are credentials.
 *
 * Names are matched case-insensitively (Windows spells `Path`, `SystemRoot`, `ComSpec`...) and
 * copied with their original casing.
 */
const CHROME_ENV_NAMES: ReadonlySet<string> = new Set([
  // Unix
  'HOME',
  'PATH',
  'USER',
  'LOGNAME',
  'SHELL',
  'TMPDIR',
  'TMP',
  'TEMP',
  'LANG',
  'LANGUAGE',
  'TZ',
  'DISPLAY',
  'WAYLAND_DISPLAY',
  'XAUTHORITY',
  'DBUS_SESSION_BUS_ADDRESS',
  // Proxies (both spellings are conventional)
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'NO_PROXY',
  // Windows
  'SYSTEMROOT',
  'SYSTEMDRIVE',
  'WINDIR',
  'COMSPEC',
  'PATHEXT',
  'USERPROFILE',
  'HOMEDRIVE',
  'HOMEPATH',
  'USERNAME',
  'APPDATA',
  'LOCALAPPDATA',
  'PROGRAMDATA',
  'PROGRAMFILES',
  'PROGRAMFILES(X86)',
  'PROGRAMW6432',
  'NUMBER_OF_PROCESSORS',
  'PROCESSOR_ARCHITECTURE',
  // macOS
  '__CF_USER_TEXT_ENCODING',
  // Custom CA bundles (OpenSSL convention, honoured by BoringSSL-based tooling)
  'SSL_CERT_FILE',
  'SSL_CERT_DIR',
  // Chrome's own knobs: the launcher's executable override, the setuid sandbox binary
  // (Chromium's Linux sandboxing docs), the headless switch and the debug log destination.
  // Exact names on purpose: a CHROME_* or SSL_CERT_* prefix would also let CHROME_API_KEY,
  // CHROME_TOKEN or SSL_CERT_PASSWORD through
  'CHROME_PATH',
  'CHROME_DEVEL_SANDBOX',
  'CHROME_HEADLESS',
  'CHROME_LOG_FILE',
])

// Locale and freedesktop base-directory variables; neither family carries secrets
const CHROME_ENV_PREFIXES: readonly string[] = ['LC_', 'XDG_']

function isAllowed(name: string): boolean {
  const upper = name.toUpperCase()
  return (
    CHROME_ENV_NAMES.has(upper) || CHROME_ENV_PREFIXES.some((prefix) => upper.startsWith(prefix))
  )
}

/** The allowlisted subset of `env`, keys kept exactly as they were spelled. */
export function chromeEnvironment(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return Object.fromEntries(Object.entries(env).filter(([name]) => isAllowed(name)))
}
