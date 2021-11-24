import { createWrapper } from 'next-redux-wrapper'
import { compose, createStore,applyMiddleware, Store, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from '@redux-saga/core'
import { Task } from '@redux-saga/types'
import reducer, { IState } from '../reducer'
import rootSaga from '../sagas'

export interface SagaStore extends Store<IState, AnyAction> {
    sagaTask: Task;
  }
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const middleware = [sagaMiddleware]
    const enhancer = process.env.NODE_ENV === 'production' 
    ? compose( applyMiddleware(...middleware))
    : composeWithDevTools(
        applyMiddleware(...middleware)
      )
    const store = createStore(reducer,enhancer);
    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store
}
const Wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default Wrapper