import {execFileSync} from 'node:child_process'
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

// pnpm links `npm:@sanity/ui@4.2.1` to this workspace because the versions
// match. Repack the published tarballs under alias names so the demo installs
// the registry builds instead.
const versions = [
  {alias: '@sanity/ui-wobbly', version: '4.2.0'},
  {alias: '@sanity/ui-fixed', version: '4.2.1'},
]

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const vendorDir = join(root, 'vendor')

mkdirSync(vendorDir, {recursive: true})

for (const {alias, version} of versions) {
  const work = join(tmpdir(), `sanity-ui-vendor-${version}`)

  rmSync(work, {recursive: true, force: true})
  mkdirSync(work, {recursive: true})
  execFileSync('npm', ['pack', `@sanity/ui@${version}`, '--pack-destination', work], {
    stdio: 'inherit',
  })

  const packed = join(work, `sanity-ui-${version}.tgz`)
  const extracted = join(work, 'extracted')

  mkdirSync(extracted)
  execFileSync('tar', ['-xzf', packed, '-C', extracted])

  const manifestPath = join(extracted, 'package', 'package.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  manifest.name = alias
  delete manifest.scripts
  delete manifest.devDependencies
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

  const output = join(vendorDir, `ui-${version}.tgz`)

  execFileSync('tar', ['-czf', output, '-C', extracted, 'package'])
  rmSync(work, {recursive: true, force: true})
  console.warn(`wrote ${output}`)
}
