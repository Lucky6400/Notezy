import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { noteReducer } from "./noteSlice";
import { settingsReducer } from "./settingsReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, noteReducer)
const persistedSettigs = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    noteReducer: persistedReducer,
    settings: persistedSettigs
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)