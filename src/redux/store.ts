import { configureStore } from '@reduxjs/toolkit'
import { authSLice } from './slicers/userslice'

export const store = configureStore({
    reducer: {
        authSLice,
    }
})

import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import userSlice from './userSlice';
const persistedConfig = {
  key: 'embrace-user-root',
  storage: AsyncStorage,
  blacklist: ['commonReducer'],
};
const reducers = combineReducers({ user: userSlice });
const persistedStore = persistReducer(persistedConfig, reducers);

const store = configureStore({
  reducer: persistedStore,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { persistor, store };