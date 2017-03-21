import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import app from './reducers'
import App from './App'
import GenerateCode from './GenerateCode'
import './index.scss'

const store = createStore(app)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <GenerateCode store={store} />
    </div>
  </Provider>,
  document.getElementById('root')
)
