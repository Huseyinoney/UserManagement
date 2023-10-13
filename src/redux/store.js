import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import userReducer from "./auth/userSlice"

import { combineReducers } from "@reduxjs/toolkit"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage"
let persistConfig = {
    key:"root",
    storage
}

let rootReducer = combineReducers({
    auth:authReducer
})
let persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: {
        auth:persistedReducer,
        user:userReducer,
    },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
})
export default store;