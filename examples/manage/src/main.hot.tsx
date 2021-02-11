import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Root} from './root'

const render = (Component: React.FC) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./root', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    render(require('./root').Root)
  })
}
