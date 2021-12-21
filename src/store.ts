import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import userReducer from 'services/reducers/user/userSlice';

// import modalReducer from 'services/reducers/modal/modalSlice';
import combineReducers from 'services/reducers';

const userPersistConfig = {
  key: 'user',
  storage,

};

export const store = configureStore({
  reducer: {
    data: persistReducer(userPersistConfig, combineReducers),
    // user: persistReducer(userPersistConfig, userReducer),
    // modal: modalReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

// setupListeners(store.dispatch);
