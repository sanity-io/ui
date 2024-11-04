import fs from 'fs/promises'
import path from 'path'
import {buildTheme_v3, RootTheme} from '@sanity/ui/theme'
import {compileSystem} from '../compile/compileSystem'
import {compileTheme} from '../compile/compileTheme'

async function buildSystem(outDir: string) {
  const css = compileSystem()

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'system.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- system.css')
}

async function buildTheme(outDir: string) {
  const theme = buildTheme_v3({
    color: {
      '*': {
        bg: {
          1: ['950', '50'],
          2: ['900', '100'],
          3: ['800', '200'],
          4: ['700', '300'],
        },
        border: {
          1: ['800', '200'],
          2: ['700', '300'],
          3: ['600', '400'],
          4: ['500', '500'],
        },
        fg: {
          1: ['white', 'black'],
          2: ['100', '900'],
          3: ['200', '800'],
          4: ['300', '700'],
        },
        shadow: {
          outline: ['500/0.4', '500/0.3'],
          umbra: ['black/0.2', '500/0.1'],
          penumbra: ['black/0.14', '500/0.07'],
          ambient: ['black/0.12', '500/0.06'],
        },
        tinted: {
          '*': {
            bg: {
              1: ['950', '50'],
              2: ['900', '100'],
              3: ['800', '200'],
              4: ['700', '300'],
            },
            fg: {
              1: ['white', 'black'],
              2: ['100', '900'],
              3: ['200', '800'],
              4: ['300', '700'],
            },
          },
        },
        solid: {
          '*': {
            bg: {
              1: ['500', '500'],
              2: ['400', '600'],
              3: ['300', '700'],
              4: ['200', '800'],
            },
            fg: {
              1: ['black', 'white'],
              2: ['900', '100'],
              3: ['800', '200'],
              4: ['700', '300'],
            },
          },
          'default': {
            bg: {
              1: ['white', 'black'],
              2: ['100', '900'],
              3: ['200', '800'],
              4: ['300', '700'],
            },
          },
          'primary': {
            _hue: 'purple',
          },
          'positive': {
            _hue: 'cyan',
          },
          'caution': {
            _hue: 'yellow',
          },
          'critical': {
            _hue: 'red',
          },
        },
      },
      'transparent': {
        bg: {
          1: ['black', '50'],
          2: ['950', '100'],
          3: ['900', '200'],
          4: ['800', '300'],
        },
      },
      'default': {
        bg: {
          1: ['950', 'white'],
          2: ['900', '50'],
          3: ['800', '100'],
          4: ['700', '200'],
        },
        tinted: {
          '*': {
            bg: {
              1: ['950', 'white'],
              2: ['900', '50'],
              3: ['800', '100'],
              4: ['700', '200'],
            },
          },
        },
      },
      'primary': {
        _hue: 'purple',
      },
      'positive': {
        _hue: 'cyan',
      },
      'caution': {
        _hue: 'yellow',
      },
      'critical': {
        _hue: 'red',
      },
    },
  })

  // const css = compileTheme(buildUITheme())
  const css = compileTheme({v3: theme} as RootTheme)

  await fs.mkdir(outDir, {recursive: true})

  await fs.writeFile(path.resolve(outDir, 'sanity-theme.css'), css, 'utf-8')

  // eslint-disable-next-line no-console
  console.log('- sanity-theme.css')
}

export async function buildCommand(options: {cwd?: string; outDir?: string}): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const outDir = options.outDir ?? path.resolve(cwd, 'dist')

  await buildSystem(outDir)

  await buildTheme(outDir)
}
