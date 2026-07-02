import {VERSION} from "../version"

export function getVersionedClassname(classname: string) {
  return `${classname}-${VERSION}`
}
