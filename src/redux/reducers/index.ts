// ========= Root Reducer
// import all modules
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import counterReducer from './counter'
import userReducer from './user'

const rootPersistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['users'],
  storage
}

const rootReducer = combineReducers({
  counterReducer,
  userReducer
})

export default persistReducer(rootPersistConfig, rootReducer)
