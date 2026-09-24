import process from 'node:process'
import readline from 'node:readline/promises'

// Colorize only a real terminal, and honor the NO_COLOR convention (https://no-color.org).
const noColor = process.env['NO_COLOR'] !== undefined
const supportsColor = process.stdout.isTTY && !noColor

function paint(code: string, text: string): string {
  if (!supportsColor) return text
  return `\u001b[${code}m${text}\u001b[0m`
}

export const color = {
  bold: (t: string) => paint('1', t),
  dim: (t: string) => paint('2', t),
  red: (t: string) => paint('31', t),
  green: (t: string) => paint('32', t),
  yellow: (t: string) => paint('33', t),
  blue: (t: string) => paint('34', t),
  cyan: (t: string) => paint('36', t),
}

export function info(message: string): void {
  process.stdout.write(`${message}\n`)
}

export function step(message: string): void {
  process.stdout.write(`${color.cyan('›')} ${message}\n`)
}

export function success(message: string): void {
  process.stdout.write(`${color.green('✓')} ${message}\n`)
}

export function warn(message: string): void {
  process.stdout.write(`${color.yellow('!')} ${message}\n`)
}

export function fail(message: string): void {
  process.stdout.write(`${color.red('✗')} ${message}\n`)
}

/** Real errors (unexpected exceptions) go to stderr; report output uses fail(). */
export function errorLine(message: string): void {
  // Gate color on stderr (where this writes), not stdout, so a redirected stderr
  // doesn't receive ANSI codes while stdout is still a TTY.
  const mark = process.stderr.isTTY && !noColor ? '\u001b[31m✗\u001b[0m' : '✗'
  process.stderr.write(`${mark} ${message}\n`)
}

export function heading(message: string): void {
  process.stdout.write(`\n${color.bold(message)}\n`)
}

interface ConfirmOptions {
  defaultValue?: boolean
  assumeYes?: boolean
}

/**
 * Ask a yes/no question. In non-interactive contexts (no TTY) it resolves to
 * the provided default so CI and agents never block.
 */
export async function confirm(question: string, options: ConfirmOptions = {}): Promise<boolean> {
  const {defaultValue = true, assumeYes = false} = options
  if (assumeYes || !process.stdin.isTTY) return defaultValue

  const rl = readline.createInterface({input: process.stdin, output: process.stdout})
  try {
    const hint = defaultValue ? 'Y/n' : 'y/N'
    const answer = (await rl.question(`${question} ${color.dim(`(${hint})`)} `))
      .trim()
      .toLowerCase()
    if (answer === '') return defaultValue
    return answer === 'y' || answer === 'yes'
  } finally {
    rl.close()
  }
}
