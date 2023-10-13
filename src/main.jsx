import React from 'react'
import ReactDOM from 'react-dom/client'
// import Login from './pages/LoginPage/Login'
import './index.css'
// import Register from './pages/RegisterPage/Register'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import App from './App'
import store from "./redux/store"
import {Provider} from "react-redux"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
let persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  <ToastContainer />
    </PersistGate>
  </Provider>
)
