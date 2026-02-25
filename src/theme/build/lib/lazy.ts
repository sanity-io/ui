/**
 * Defines a lazy, self-replacing property on `obj`.
 *
 * On first access the `factory` is called and the getter is replaced with the
 * computed plain value — subsequent reads have zero overhead.
 *
 * The property is enumerable (visible in `Object.keys` / spread) in both states.
 *
 * @internal
 */
export function defineLazyProperty<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  factory: () => T[K],
): void {
  Object.defineProperty(obj, key, {
    get() {
      const value = factory()
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        writable: false,
        configurable: false,
      })
      return value
    },
    enumerable: true,
    configurable: true,
  })
}
