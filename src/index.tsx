import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import store from './infrastructure/redux/store'
import { AppRoutes } from './infrastructure/views/routes'
import reportWebVitals from './reportWebVitals'
import './infrastructure/views/assets/fonts/FSLola/FSLola.ttf'
import './styles.scss'

moment.locale('pt-br')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div id="App">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
