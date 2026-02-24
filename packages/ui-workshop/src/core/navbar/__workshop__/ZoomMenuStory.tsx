import {Flex, PortalProvider} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {findByTestId, fireEvent} from '@testing-library/dom'
import {useState} from 'react'

import {ZoomMenu} from '../ZoomMenu'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function ZoomMenuStory() {
  const {ref, Wrapper} = usePerfTest<HTMLDivElement>({
    name: 'zoom-menu-click',
    title: 'Zoom Menu Button Click',
    description: 'Tests the performance of clicking the zoom menu button',
    async run({target}) {
      // console.log('target', target)

      // Find and click the button
      const button = await findByTestId(target, 'zoom-menu-button')

      // console.log('button', button)

      // Perform multiple clicks
      fireEvent.mouseDown(button)

      await delay(20)

      // eslint-disable-next-line no-console
      console.log('target', target.outerHTML)

      const popover = await findByTestId(target, 'zoom-menu-popover')

      // eslint-disable-next-line no-console
      console.log(popover.outerHTML)
      // fireEvent.click(button)
      // fireEvent.click(button)
    },
  })

  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <Wrapper>
      <PortalProvider element={portalElement}>
        <Flex ref={ref} align="center" height="fill" justify="center">
          <ZoomMenu />
        </Flex>
        <div ref={setPortalElement} data-testid="portal-target" />
      </PortalProvider>
    </Wrapper>
  )
}
