import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'


async function enableMocking() {
  // Worker is alwasy mocking, TO DO: add logic to only mock in dev
  
  if(false){ // Change to true to disable mocking
    return
  }
  const { worker } = await import('./__mocks__/browser')

  return worker.start()
}
 
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
})

