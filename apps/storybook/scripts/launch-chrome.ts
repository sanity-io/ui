/**
 * Launches Chrome with its remote debugging (Chrome DevTools Protocol) port open and loads the
 * Storybook preview in it, so `chrome-devtools-mcp` can attach with
 * `--browserUrl=http://127.0.0.1:<port>` and expose the React DevTools tools registered by
 * `react-devtools-cdt-mcp` (see the `reactDevtoolsMcp` plugin in `.storybook/main.ts`).
 *
 * Usage: `pnpm react-devtools-mcp:chrome [url] [--headless] [--port=9222] [-- <extra chrome args>]`
 *
 * - `url` defaults to a single story rendered through `iframe.html`. Tool discovery only sees the
 *   top-level document, so stories must be opened that way rather than through the manager UI.
 * - `CHROME_PATH` overrides the Chrome executable that is used.
 * - Chrome is started with an allowlisted environment (`CHROME_ENV_NAMES` / `CHROME_ENV_PREFIXES`
 *   below) instead of the caller's, so tokens and keys in the shell never reach
 *   `/proc/<pid>/environ` for the browser's lifetime.
 * - The profile lives in `node_modules/.cache/react-devtools-mcp/chrome-profile` and is reused
 *   across runs. Chrome stays open after this script exits; stop it with `kill <pid>`. When a
 *   browser already listens on the port, the url is opened as a new tab in it instead.
 */
// oxlint-disable no-console, no-await-in-loop -- CLI script: reports to stdout and polls Chrome's debugging endpoint sequentially
import {spawn} from 'node:child_process'
import {accessSync, constants, mkdirSync} from 'node:fs'
import path from 'node:path'
import {setTimeout as sleep} from 'node:timers/promises'

const DEFAULT_URL = 'http://localhost:6006/iframe.html?viewMode=story&id=primitives-button--default'
const DEFAULT_PORT = 9222
const STARTUP_TIMEOUT_MS = 30_000
const PROBE_TIMEOUT_MS = 2_000

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:'])
// Chrome gets exactly this environment and nothing else from the caller's shell. Covered: user
// and paths, temp dirs, locale and time zone, the display and session bus, proxy settings,
// custom CA bundles and Chrome's own CHROME_* knobs. GOOGLE_* is left out on purpose: this
// launcher relies on none of those and GOOGLE_API_KEY / GOOGLE_DEFAULT_CLIENT_SECRET are
// credentials.
const CHROME_ENV_NAMES = new Set([
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
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'NO_PROXY',
  'http_proxy',
  'https_proxy',
  'no_proxy',
])
const CHROME_ENV_PREFIXES = ['LC_', 'XDG_', 'SSL_CERT_', 'CHROME_']

/** The allowlisted subset of `env` that Chrome is started with. */
function chromeEnvironment(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([name]) =>
        CHROME_ENV_NAMES.has(name) || CHROME_ENV_PREFIXES.some((prefix) => name.startsWith(prefix)),
    ),
  )
}

interface Options {
  url: URL
  port: number
  headless: boolean
  chromeArgs: string[]
}

/** A raw url argument safe to echo in an error: any `user:password@` segment is redacted. */
function redactUserinfo(value: string): string {
  return value.replace(/[^/\s@]+:[^/\s@]+@/g, '<redacted>@')
}

/**
 * Parses the url to open. Anything that is not an absolute http(s) url is rejected up front, and
 * so is a url with embedded credentials, which would otherwise travel with it everywhere.
 */
function parseUrl(value: string): URL {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error(`Invalid url "${redactUserinfo(value)}": expected an absolute http(s) url`)
  }
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    throw new Error(`Invalid url "${redactUserinfo(value)}": expected an absolute http(s) url`)
  }
  if (url.username !== '' || url.password !== '') {
    throw new Error(
      `Invalid url for ${url.origin}: credentials in the url (user:password@) are not supported`,
    )
  }
  return url
}

/**
 * The url for messages, rebuilt from origin, path and query so that nothing outside those parts
 * (a fragment, or anything else a caller typed) can be echoed.
 */
function describeUrl(url: URL): string {
  return `${url.origin}${url.pathname}${url.search}${url.hash === '' ? '' : '#…'}`
}

function parsePort(value: string | undefined): number {
  const port = value !== undefined && /^\d+$/.test(value) ? Number(value) : Number.NaN
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid --port "${value ?? ''}": expected an integer between 1 and 65535`)
  }
  return port
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    url: new URL(DEFAULT_URL),
    port: DEFAULT_PORT,
    headless: false,
    chromeArgs: [],
  }
  const passthroughIndex = argv.indexOf('--')
  const ownArgs = passthroughIndex === -1 ? argv : argv.slice(0, passthroughIndex)
  options.chromeArgs = passthroughIndex === -1 ? [] : argv.slice(passthroughIndex + 1)

  for (let i = 0; i < ownArgs.length; i++) {
    const arg = ownArgs[i]
    if (arg === '--headless') {
      options.headless = true
    } else if (arg.startsWith('--port=')) {
      options.port = parsePort(arg.slice('--port='.length))
    } else if (arg === '--port') {
      options.port = parsePort(ownArgs[++i])
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option ${arg}. Pass Chrome flags after "--".`)
    } else {
      options.url = parseUrl(arg)
    }
  }

  return options
}

function isExecutable(file: string): boolean {
  try {
    accessSync(file, constants.X_OK)
    return true
  } catch {
    return false
  }
}

function findChrome(): string {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH
  }

  let candidates: string[]
  if (process.platform === 'darwin') {
    candidates = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ]
  } else if (process.platform === 'win32') {
    candidates = [
      process.env['PROGRAMFILES'],
      process.env['PROGRAMFILES(X86)'],
      process.env['LOCALAPPDATA'],
    ]
      .filter((dir): dir is string => Boolean(dir))
      .map((dir) => path.join(dir, 'Google', 'Chrome', 'Application', 'chrome.exe'))
  } else {
    const names = [
      'google-chrome',
      'google-chrome-stable',
      'chromium',
      'chromium-browser',
      'chrome',
    ]
    const dirs = (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)
    candidates = names.flatMap((name) => dirs.map((dir) => path.join(dir, name)))
  }

  const chrome = candidates.find(isExecutable)
  if (!chrome) {
    throw new Error(
      'Could not find a Chrome executable. Install Google Chrome or set CHROME_PATH to the binary.',
    )
  }
  return chrome
}

/** Reads the `Browser` field of Chrome's `/json/version` response. */
function getBrowserName(versionInfo: unknown): string {
  if (
    typeof versionInfo === 'object' &&
    versionInfo !== null &&
    'Browser' in versionInfo &&
    typeof versionInfo.Browser === 'string'
  ) {
    return versionInfo.Browser
  }
  return 'Chrome'
}

/** The browser name when a DevTools endpoint answers on `port`, `null` otherwise. */
async function probeDevTools(port: number): Promise<string | null> {
  try {
    // A port that accepts the connection but never answers must not stall the startup timeout
    const response = await fetch(`http://127.0.0.1:${port}/json/version`, {
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    })
    return response.ok ? getBrowserName(await response.json()) : null
  } catch {
    return null
  }
}

/** Polls the debugging port until it answers, Chrome fails (`getFailure`) or the timeout passes. */
async function waitForDevTools(port: number, getFailure: () => Error | null): Promise<string> {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS
  while (Date.now() < deadline) {
    const browserName = await probeDevTools(port)
    if (browserName !== null) {
      return browserName
    }
    const failure = getFailure()
    if (failure !== null) {
      throw failure
    }
    await sleep(250)
  }
  throw new Error(
    `Chrome did not open http://127.0.0.1:${port} within ${STARTUP_TIMEOUT_MS / 1000}s`,
  )
}

interface Launched {
  browserName: string
  /** Undefined when the url was opened in a browser that was already running. */
  pid?: number
}

/**
 * Opens `url` in a new tab of the browser already serving `browserUrl`. A second Chrome on the
 * same profile would only hand the url over to it (headed) or exit without opening it (headless),
 * and its short-lived pid would be meaningless to report.
 */
async function openInRunningBrowser(
  browserUrl: string,
  browserName: string,
  url: string,
): Promise<Launched> {
  // Chrome reads the url from the raw query string and unescapes it, so encoding keeps `&`,
  // `?` and `#` inside `url` intact
  const response = await fetch(`${browserUrl}/json/new?${encodeURIComponent(url)}`, {
    method: 'PUT',
    signal: AbortSignal.timeout(STARTUP_TIMEOUT_MS),
  })
  if (!response.ok) {
    throw new Error(
      `The browser listening on ${browserUrl} refused to open a new tab (HTTP ${response.status})`,
    )
  }
  return {browserName}
}

/** Starts Chrome on `options.url` and resolves once its debugging port answers. */
async function launchChrome(options: Options): Promise<Launched> {
  // Resolved here rather than up front: opening a tab in a running browser needs no executable
  const chrome = findChrome()
  const packageDir = path.resolve(import.meta.dirname, '..')
  const userDataDir = path.join(
    packageDir,
    'node_modules',
    '.cache',
    'react-devtools-mcp',
    'chrome-profile',
  )
  mkdirSync(userDataDir, {recursive: true})

  const args = [
    `--remote-debugging-port=${options.port}`,
    '--remote-debugging-address=127.0.0.1',
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    ...(options.headless ? ['--headless=new'] : []),
    // Chrome refuses to run its sandbox as root (containers, some CI runners)
    ...(process.platform === 'linux' && process.getuid?.() === 0 ? ['--no-sandbox'] : []),
    ...options.chromeArgs,
    options.url.href,
  ]

  const child = spawn(chrome, args, {
    detached: true,
    stdio: 'ignore',
    env: chromeEnvironment(process.env),
  })
  child.unref()
  let failure: Error | null = null
  // A spawn that fails (stale CHROME_PATH, missing binary) emits `error` and no `exit`; without a
  // listener Node would terminate on it instead of reaching main().catch
  child.once('error', (error) => {
    failure ??= new Error(`Could not start Chrome at ${chrome}: ${error.message}`)
  })
  child.once('exit', () => {
    failure ??= new Error(
      'Chrome exited before opening its debugging port. A Chrome using the react-devtools-mcp ' +
        'profile is probably already running without one; close it and retry.',
    )
  })

  const browserName = await waitForDevTools(options.port, () => failure)
  return {browserName, pid: child.pid}
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2))
  const hasDisplay = Boolean(process.env.DISPLAY || process.env.WAYLAND_DISPLAY)
  options.headless ||= process.platform === 'linux' && !hasDisplay
  const browserUrl = `http://127.0.0.1:${options.port}`

  const runningBrowser = await probeDevTools(options.port)
  const {browserName, pid} =
    runningBrowser === null
      ? await launchChrome(options)
      : await openInRunningBrowser(browserUrl, runningBrowser, options.url.href)

  // A reused browser's mode is unknown; --headless only describes a Chrome started here
  const mode = pid !== undefined && options.headless ? ' (headless)' : ''
  console.log(`${browserName} is listening on ${browserUrl}${mode}`)
  console.log(`Opened ${describeUrl(options.url)}`)
  console.log(
    pid === undefined
      ? `Reused the browser that was already listening on ${browserUrl}`
      : `Chrome pid: ${pid}`,
  )
  console.log('')
  console.log('Attach chrome-devtools-mcp to it with:')
  console.log(
    `  pnpm --filter sanity-ui-storybook exec chrome-devtools start --categoryExperimentalThirdParty=true --browserUrl=${browserUrl}`,
  )
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
