export function NpmPackageBadge({name}: {name: string}) {
  const href = `https://www.npmjs.com/package/${name}`
  const src = `https://img.shields.io/npm/v/${name}.svg?style=flat-square`

  return (
    <a href={href} rel="noreferrer" target="_blank">
      <img src={src} />
    </a>
  )
}
