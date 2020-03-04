import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxSaga from 'redux-saga';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IStore, rootReducer } from '@reducers';
import { rootSaga } from '@sagas';

export const reduxPersistKey = 'persist';

export default (initialState: IStore) => {
  const sagaMiddleware = reduxSaga();

  const persistConfig = {
    storage,
    key: reduxPersistKey,
    whitelist: []
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
