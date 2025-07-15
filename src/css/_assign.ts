export function _assign<T extends object, U extends object>(target: T, source: U): T & U {
  return Object.assign(target, source)
}
