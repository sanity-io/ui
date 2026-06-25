const version = 'alpha17'

export function getVersionedClassname(classname: string) {
  return `${classname}-${version}`
}
