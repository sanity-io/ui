import {test} from 'vitest'

import {buildMenu} from './menu'

test('menu', () => {
  const menu = buildMenu(
    [
      {
        name: 'ui-workshop',
        title: 'Workshop',
        children: [
          {
            name: 'navbar',
            title: 'Navbar',
          },
        ],
      },
    ],
    [
      {
        name: 'ui-workshop/navbar/test',
        title: 'Test',
        stories: [],
      },
    ],
  )

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(menu, null, 2))
})
