import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import RouterApp from './router/routes.jsx'
import store from 'store/store.js'
import { Toaster } from 'sonner'
import './assets/styles/app.scss'
import { injectStore } from './services/index.js'
injectStore(store);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterApp />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode >,
)
