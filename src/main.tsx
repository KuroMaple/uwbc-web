import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import { handlers } from './__mocks__/handler'


async function enableMocking() {
  // Worker is alwasy mocking, TO DO: add logic to only mock in dev
  
  const { worker } = await import('../src/__mocks__/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start()
  worker.use(...handlers)
  return 
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

