import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxSaga from 'redux-saga';

import { rootReducer, IStore } from '@Reducers';
import { rootSaga } from '@Sagas';

export default (initialState: any) => {
  const sagaMiddleware = reduxSaga();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
