export async function findNearestCard(
  node: BaseNode,
): Promise<{instance: InstanceNode; mainComponent: ComponentNode} | null> {
  let n: BaseNode | null = node

  while (n) {
    if (n.type === 'INSTANCE') {
      const instance = n as InstanceNode
      const mainComponent = await instance.getMainComponentAsync()

      if (mainComponent?.parent?.name === 'Card') {
        return {instance, mainComponent}
      }
    }

    n = n.parent
  }

  return null
}
