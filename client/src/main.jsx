import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/testing.css'
//import 'normalize.css';
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'
import { ContextProvider } from './context/Context.jsx'

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <ContextProvider>
        <App />
        </ContextProvider>
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
