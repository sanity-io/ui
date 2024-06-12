import {isElement, isFragment} from 'react-is'

// @TODO this is breaking the image input menu
export function childrenToElementArray(
  children: React.ReactNode,
): Array<React.ReactElement | string> {
  const childrenArray = Array.isArray(children) ? children : [children]

  return childrenArray.filter(
    (node) => isElement(node) || isFragment(node) || typeof node === 'string',
  ) as Array<React.ReactElement | string>
}
